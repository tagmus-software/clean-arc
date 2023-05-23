import { EventConsumerType } from "@clean-arc/core";

export abstract class Transport<T = unknown> {
    protected configuration: T;
    protected connectionName: string;
    constructor(configuration: T) {
        this.configuration = configuration;
    }
    abstract bindConsumers(handlers: EventConsumerType[]): Promise<any>;
    abstract connect(): Promise<void>;
}
