import { EventContext } from "@clean-arc/core";
import { RabbitMqContextParams } from "./types";
import { AMQPChannel, AMQPProperties } from "@cloudamqp/amqp-client";
import { RabbitMqBatchMessage } from "./batch-message";
import { RabbitMqMessage } from "./message";
import { GenericError } from "@clean-arc/common";

type PublishMessageOnQueueParams = {
    data: any;
    queue: string;
    topic?: string;
    options?: AMQPProperties;
    mandatory?: boolean;
};
export class RabbitMqContext extends EventContext<RabbitMqContextParams> {
    public isTransactionModeActive: boolean;
    private publishChannel: AMQPChannel;

    get channel() {
        if (this.publishChannel && !this.publishChannel.closed) {
            return this.publishChannel;
        }
        return this.context.channel;
    }

    async publishMessage(data: any) {
        await this.context.queue.publish(JSON.stringify(data));
        return true;
    }

    async publishMessageOnQueue({
        queue,
        topic,
        data,
        options,
        mandatory,
    }: PublishMessageOnQueueParams) {
        if (!topic) {
            topic = "";
        }

        return this.channel.basicPublish(
            topic,
            queue,
            JSON.stringify(data),
            options,
            mandatory
        );
    }

    async setPublishChannel(channel: AMQPChannel) {
        this.publishChannel = channel;
    }

    async closeChannel() {
        await this.context.queue.channel.close();
    }

    public getFullMessage<T = unknown>(): RabbitMqMessage<T> {
        if (this.isBatchMessage()) {
            this.throwIfIsBatchMsg();
        }
        return this.context.msg as RabbitMqMessage<T>;
    }

    public getJsonMessage<T = unknown>() {
        if (this.isBatchMessage()) {
            this.throwIfIsBatchMsg();
        }

        return (this.context.msg as RabbitMqMessage<T>).toJson();
    }

    public getBatchMessage<T>(): RabbitMqBatchMessage<T> {
        if (!this.isBatchMessage()) {
            throw new GenericError(
                `Message is not a batch, please, use the method .getFullMessage() or getJsonMessage() to handle your message`
            );
        }
        return this.context.msg as RabbitMqBatchMessage<T>;
    }

    public isBatchMessage() {
        return this.context.msg instanceof RabbitMqBatchMessage;
    }

    public commitTransaction() {
        if (!this.isTransactionModeActive) {
            return;
        }
        return this.context.channel.txCommit();
    }

    public rollbackTransaction() {
        if (!this.isTransactionModeActive) {
            return;
        }
        return this.context.channel.txRollback();
    }

    private throwIfIsBatchMsg() {
        if (this.isBatchMessage()) {
            throw new GenericError(
                `Message is in batch format, please, use the method  .getBatchMessage() to get your message`
            );
        }
    }
}
