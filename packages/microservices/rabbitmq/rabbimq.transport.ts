import { GenericError, Transport } from "@clean-arc/common";
import { EventConsumerType, logger } from "@clean-arc/core";
import { AMQPClient, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";
import { RabbitMqConfiguration, RabbitMqQueue } from "./types";
import { RabbitMqContext } from "./rabbitmq-context";

export class RabbitMqTransport extends Transport<
    RabbitMqConfiguration,
    AMQPBaseClient
> {
    private queueMap: Map<
        string,
        { consumeParams: RabbitMqQueue["consumeParams"]; queue: AMQPQueue }
    >;
    async bindConsumer(handler: EventConsumerType): Promise<void> {
        const { queue, consumeParams } =
            this.queueMap.get(handler.eventName) || {};
        if (!queue) {
            throw new GenericError(
                `Queue "${handler.eventName}" for ${handler.options?.consumerName} not declared on connection startup`,
                "ERR_QUEUE_NOT_DECLARED"
            );
        }

        logger.info(`Starting consuming queue "${handler.eventName}"`);
        queue.subscribe(consumeParams, async (msg) => {
            const context = new RabbitMqContext({
                msg,
                queue,
            });

            try {
                await handler.callback.apply(handler.target, [context]);
            } catch (error) {
                if (error instanceof GenericError) {
                    logger.error(error.getBody(), error.statusCode as string);
                } else {
                    logger.error(error, "ERR_RABBITMQ_CONSUMER");
                }
            }
        });
    }

    async connect(): Promise<void> {
        const amqp = new AMQPClient(this.configuration.url);
        this.connection = await amqp.connect();

        await Promise.all(this.setupQueues(this.configuration.queues || []));
    }

    private setupQueues(queues: RabbitMqQueue[]) {
        this.queueMap = new Map();
        return queues.map(
            async ({ channelId, name, consumeParams, ...options }) => {
                const channel = await this.connection.channel(channelId || 1);
                const amqpQueue = await channel.queue(name, options);
                this.queueMap.set(name, {
                    queue: amqpQueue,
                    consumeParams,
                });
            }
        );
    }
}
