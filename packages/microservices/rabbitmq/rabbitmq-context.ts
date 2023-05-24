import { EventContext } from "@clean-arc/core";
import { RabbitMqContextParams } from "./types";
import { AMQPMessage } from "@cloudamqp/amqp-client";
import { RabbitMqBatchMessage } from "./batch-message";
import { RabbitMqMessage } from "./message";

export class RabbitMqContext extends EventContext<RabbitMqContextParams> {
    public isTransactionModeActive: boolean;

    async publishMessage(data: any) {
        await this.context.queue.publish(JSON.stringify(data));
        return true;
    }
    async closeChannel() {
        await this.context.queue.channel.close();
    }

    public getFullMessage() {
        if (this.isBatchMessage()) {
            return null;
        }
        return this.context.msg;
    }

    public getJsonMessage() {
        if (this.isBatchMessage()) {
            return null;
        }

        return (this.context.msg as RabbitMqMessage).toJson();
    }

    public getBatchMessage(): RabbitMqBatchMessage | undefined {
        if (this.isBatchMessage()) {
            return this.context.msg as RabbitMqBatchMessage;
        }
    }

    public isBatchMessage() {
        return this.context.msg instanceof RabbitMqBatchMessage;
    }

    public commitTransaction() {
        if (!this.isTransactionModeActive) {
            return null;
        }
        return this.context.channel.txCommit();
    }

    public rollbackTransaction() {
        if (!this.isTransactionModeActive) {
            return null;
        }
        return this.context.channel.txRollback();
    }
}
