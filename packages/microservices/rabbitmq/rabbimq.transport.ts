import { GenericError, Transport } from "@clean-arc/common";
import { EventConsumerType, logger } from "@clean-arc/core";
import { AMQPChannel, AMQPClient, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";
import {
    RabbitMqBatchOptions,
    RabbitMqConfiguration,
    RabbitMqQueue,
} from "./types";
import { RabbitMqContext } from "./rabbitmq-context";
import { RabbitMqBatchMessage } from "./batch-message";
import { RabbitMqMessage } from "./message";

type HandlerCallbackConsumerParams = {
    handler: EventConsumerType;
    context: RabbitMqContext;
    autoTransaction?: boolean;
};

type QueueBind = {
    appQueue: RabbitMqQueue;
    queue: AMQPQueue;
};
export class RabbitMqTransport extends Transport<
    RabbitMqConfiguration,
    AMQPBaseClient
> {
    private queueMap: Map<string, QueueBind>;

    async bindConsumer(handler: EventConsumerType): Promise<void> {
        const { queue, appQueue } = this.queueMap.get(
            handler.eventName
        ) as QueueBind;

        if (!queue) {
            throw new GenericError(
                `Queue "${handler.eventName}" for ${handler.options?.consumerName} not declared on connection startup`,
                "ERR_RABBITMQ_QUEUE_NOT_DECLARED"
            );
        }

        logger.info(`Starting consuming queue "${handler.eventName}"`);

        let batchMessage: RabbitMqBatchMessage;
        if (appQueue.batch && appQueue.batch.enabled) {
            batchMessage = new RabbitMqBatchMessage({
                ...(appQueue.batch as RabbitMqBatchOptions),
                queueName: handler.eventName,
            });
        }

        const autoTransaction = appQueue.transactionAutoCommit;
        const channel = await this.connection.channel(queue.channel.id);
        if (appQueue.transactionMode) {
            await channel.txSelect();
        }
        await queue.subscribe(appQueue.consumeParams, async (_msg) => {
            const msg = new RabbitMqMessage(_msg);
            let context: RabbitMqContext;
            if (appQueue.batch && appQueue.batch.enabled) {
                context = new RabbitMqContext({
                    queue,
                    msg: batchMessage,
                    channel,
                });

                batchMessage.accumulateMessage(msg);

                if (batchMessage.isBatchReady()) {
                    return batchMessage.dispatch(() =>
                        this.handleCallbackConsumer({
                            handler,
                            context,
                            autoTransaction,
                        })
                    );
                }

                return batchMessage.timeoutDispatch(() =>
                    this.handleCallbackConsumer({
                        context,
                        handler,
                        autoTransaction,
                    })
                );
            }

            context = new RabbitMqContext({
                msg,
                queue,
                channel,
            });

            return this.handleCallbackConsumer({
                handler,
                context,
                autoTransaction,
            });
        });
    }

    async connect(): Promise<void> {
        const amqp = new AMQPClient(this.configuration.url);
        this.connection = await amqp.connect();

        await Promise.all(this.setupQueues(this.configuration.queues || []));
    }

    private setupQueues(queues: RabbitMqQueue[]) {
        this.queueMap = new Map();
        return queues.map(async (appQueue) => {
            const channel = await this.connection.channel(appQueue.channelId);

            let prefetch = appQueue.messagesInParallel || 15;
            if (appQueue.batch) {
                appQueue.batch.enabled = appQueue.batch.enabled ?? true;
                prefetch = appQueue.batch.batchSize;
            }
            await channel.prefetch(prefetch);

            const amqpQueue = await channel.queue(appQueue.name, {
                durable: appQueue.durable,
                exclusive: appQueue.exclusive,
                autoDelete: appQueue.autoDelete,
                passive: appQueue.passive,
            });
            this.queueMap.set(appQueue.name, {
                queue: amqpQueue,
                appQueue,
            });
        });
    }

    private async handleCallbackConsumer({
        handler,
        context,
        autoTransaction = true,
    }: HandlerCallbackConsumerParams) {
        try {
            await handler.callback.apply(handler.target, [context]);

            if (autoTransaction) await context.commitTransaction();
        } catch (error) {
            if (error instanceof GenericError) {
                logger.error(error.getBody(), error.statusCode as string);
            } else {
                logger.error(error, "ERR_RABBITMQ_CONSUMER");
            }
            if (autoTransaction) await context.rollbackTransaction();
        }
    }
}
