import { GenericError, Transport } from "@clean-arc/common";
import { EventConsumerType, logger } from "@clean-arc/core";
import { AMQPClient, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";
import {
    RabbitMqBatchOptions,
    RabbitMqConfiguration,
    RabbitMqQueue,
} from "./types";
import { RabbitMqContext } from "./rabbitmq-context";
import { RabbitMqBatchMessage } from "./batch-message";
import { RabbitMqMessage } from "./message";
import { BatchManager } from "./batch-manager";

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
        const consumerName = `rabbitmq consumer  ${handler.options?.consumerName}.${handler.propertyKey}(...) `;
        if (!this.localActiveConsumersMap.get(handler.eventName)) {
            logger.info(
                `${consumerName} - on queue ${handler.eventName} is not active`
            );
            return;
        }

        const { queue, appQueue } = this.queueMap.get(
            handler.eventName
        ) as QueueBind;

        if (!queue) {
            throw new GenericError(
                `Queue "${handler.eventName}" for ${consumerName} not declared on connection startup`,
                "ERR_RABBITMQ_QUEUE_NOT_DECLARED"
            );
        }

        logger.info(
            `Starting consuming queue "${handler.eventName}" in the ${consumerName}`
        );

        let batchManager: BatchManager;
        if (appQueue.batch && appQueue.batch.enabled) {
            batchManager = new BatchManager(
                appQueue.batch as RabbitMqBatchOptions
            );
        }

        const autoTransaction = appQueue.transactionAutoCommit;
        const channel = await this.connection.channel(queue.channel.id);
        if (appQueue.transactionMode) {
            logger.debug("Transaction mode activated");
            await channel.txSelect();
        }
        await queue.subscribe(appQueue.consumeParams, async (_msg) => {
            const msg = new RabbitMqMessage(_msg);

            let context: RabbitMqContext;
            if (batchManager) {
                // batchMessage.accumulateMessage(msg);
                batchManager.incrementBatchMessage(msg, handler.eventName);

                if (batchManager.hasBatchReady()) {
                    context = new RabbitMqContext({
                        queue,
                        msg: batchManager.getAndRemoveBatch(),
                        channel,
                    });
                    return await batchManager.dispatch(() =>
                        this.handleCallbackConsumer({
                            handler,
                            context,
                            autoTransaction,
                        })
                    );
                }

                return await batchManager.timeoutDispatch(() =>
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

            return await this.handleCallbackConsumer({
                handler,
                context,
                autoTransaction,
            });
        });
    }

    async connect(): Promise<void> {
        const amqp = new AMQPClient(this.configuration.url);
        amqp.onerror = (error) => {
            logger.error(error, "ERR_RABBITMQ_CONNECTION");
            throw new GenericError(error, "ERR_RABBITMQ_CONNECTION");
        };
        this.connection = await amqp.connect();
        if (this.configuration.disabledPublish) {
            RabbitMqContext.prototype.publishMessage = async (data) => {
                logger.debug(data, `Fake publish`);
                return true;
            };

            RabbitMqContext.prototype.publishMessageOnQueue = async (
                ...args: any[]
            ) => {
                logger.debug(args, `Fake publish on queue`);
                return 1;
            };
        }
        await Promise.all(this.setupQueues(this.configuration.queues || []));
    }

    private setupQueues(queues: RabbitMqQueue[]) {
        this.queueMap = new Map();
        return queues.map(async (appQueue) => {
            const active = this.localActiveConsumersMap.get(appQueue.name);
            if (!active) {
                logger.debug(
                    `Skipping creation of channel and queue(${appQueue.name}) because local consumer is inactive with value ${active}`
                );
                return;
            }

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

            if (autoTransaction) {
                logger.debug("Committing transaction");
                await context.commitTransaction();
            }
        } catch (error) {
            if (autoTransaction) {
                logger.debug("Rolling back transaction");
                await context.rollbackTransaction();
            }
            let reason = "ERR_RABBITMQ_CONSUMER";
            if (error instanceof GenericError) {
                reason = String(error.statusCode);
                logger.error(error.getBody(), reason);
            } else {
                logger.error(error, reason);
            }
            await this.connection.close(reason);
        }
    }
}
