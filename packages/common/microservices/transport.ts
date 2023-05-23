import { EventConsumerType } from "@clean-arc/core";

export abstract class Transport<T = unknown, C = any> {
    public connectionName: string;

    protected configuration: T;
    protected connection: C;
    constructor(configuration: T) {
        this.configuration = configuration;
    }
    abstract bindConsumer(consumer: EventConsumerType): Promise<void>;
    abstract connect(): Promise<void>;
}
