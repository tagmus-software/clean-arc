import { AMQPMessage } from "@cloudamqp/amqp-client";
import { nanoid } from "nanoid";
import { GenericError } from "@clean-arc/common";
import {
    RabbitMqBatchOptions,
    RabbitMqContext,
    RabbitMqMessage,
    RabbitMqMessageObj,
} from "./";

type BatchOptions = {
    queueName: string;
} & RabbitMqBatchOptions;

export class RabbitMqBatchMessage<BodyType = any> {
    protected messagesMaps: Map<number, RabbitMqMessage<BodyType>>[];

    protected batchSize: BatchOptions["batchSize"];
    protected batchTimeWait: BatchOptions["batchTimeWait"];
    protected enabled: BatchOptions["enabled"];

    protected timeout: NodeJS.Timeout;
    public isDispatched: boolean;

    constructor(options: BatchOptions) {
        this.batchSize = options.batchSize;
        if (!this.batchSize) {
            throw new GenericError(
                `Batch size should be informed for queue "${options.queueName}"`
            );
        }

        this.batchTimeWait = options.batchTimeWait || 500;
        this.enabled = options.enabled || true;
        this.messagesMaps = [];
    }

    private get lastBatchMap() {
        if (!this.messagesMaps.length) {
            this.messagesMaps.push(new Map());
        }
        const lastMap = this.messagesMaps[this.messagesMaps.length - 1];

        if (lastMap.size >= this.batchSize) {
            this.messagesMaps.push(new Map());
        }

        return this.messagesMaps[this.messagesMaps.length - 1];
    }

    private get currentBatchMap() {
        return this.messagesMaps[0];
    }

    public accumulateMessage(msg: RabbitMqMessage<BodyType>) {
        clearTimeout(this.timeout);
        if (this.lastBatchMap.size <= this.batchSize) {
            this.lastBatchMap.set(msg.deliveryTag, msg);
        }
    }

    public isBatchReady(): boolean {
        return this.currentBatchMap.size >= this.batchSize;
    }

    public getMessagesJson() {
        const msgs: RabbitMqMessageObj<BodyType>[] = [];
        this.currentBatchMap.forEach((msg) => {
            msgs.push(msg.toJson());
        });
        return msgs;
    }

    public async ack(deliveryTag: number) {
        await this.currentBatchMap.get(deliveryTag)?.ack();
    }

    public async nack(deliveryTag: number) {
        await this.currentBatchMap.get(deliveryTag)?.nack();
    }

    public async nackAll() {
        const promises: Promise<void>[] = [];

        this.currentBatchMap.forEach((msg) => {
            promises.push(msg.nack());
        });

        return Promise.all(promises);
    }

    public async ackAll() {
        const promises: Promise<void>[] = [];

        this.currentBatchMap.forEach((msg) => {
            promises.push(msg.ack());
        });
        return Promise.all(promises);
    }

    public async dispatch(callback: () => Promise<void>) {
        callback();
    }
    public async timeoutDispatch(callback: () => Promise<void>) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.dispatch(callback);
        }, this.batchTimeWait);
    }
}
