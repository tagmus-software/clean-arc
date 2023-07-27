import { GenericError } from "@clean-arc/common";
import { BatchOptions, RabbitMqMessage, RabbitMqMessageObj } from "./";

export class RabbitMqBatchMessage<BodyType = any> {
    protected messageMap: Map<number, RabbitMqMessage<BodyType>>;

    protected batchSize: BatchOptions["batchSize"];
    protected enabled: BatchOptions["enabled"];

    public isDispatched: boolean;

    constructor(options: BatchOptions) {
        this.batchSize = options.batchSize;
        if (!this.batchSize) {
            throw new GenericError(
                `Batch size should be informed for queue "${options.queueName}"`
            );
        }
        this.enabled = options.enabled || true;
        this.messageMap = new Map();
    }

    public accumulateMessage(msg: RabbitMqMessage<BodyType>) {
        this.messageMap.set(msg.deliveryTag, msg);
    }

    public isBatchReady(): boolean {
        return this.messageMap.size >= this.batchSize;
    }

    public getMessagesJson() {
        const msgs: RabbitMqMessageObj<BodyType>[] = [];
        this.messageMap.forEach((msg) => {
            msgs.push(msg.toJson());
        });
        return msgs;
    }

    public async ackOne(deliveryTag: number) {
        await this.messageMap.get(deliveryTag)?.ack();
    }

    public async nackOne(deliveryTag: number) {
        await this.messageMap.get(deliveryTag)?.nack();
    }

    public async nackAll() {
        const promises: Promise<void>[] = [];

        this.messageMap.forEach((msg) => {
            promises.push(msg.nack());
        });

        await Promise.all(promises);
    }

    public async ackAll() {
        const promises: Promise<void>[] = [];
        this.messageMap.forEach((msg) => {
            promises.push(msg.ack());
        });
        await Promise.all(promises);
    }
}
