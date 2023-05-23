import { Transport } from "@clean-arc/common";
import { EventConsumerType } from "./types";
import EventEmitter from "events";

export * from "./constants";
export * from "./decorators";
export * from "./types";

export const localEventEmitter = new EventEmitter();

type LocalTransportConfiguration = {};
export class LocalTransport extends Transport<LocalTransportConfiguration> {
    async bindConsumers(handlers: EventConsumerType[]): Promise<any> {
        // TODO: Implement local event emitter
    }
    async connect(): Promise<void> {}
}

export abstract class EventContext {
    constructor(protected engine: any) {}

    abstract createPublisher(): Promise<(data: any) => Promise<boolean>>;
    abstract closeChannel(): Promise<boolean>;
    abstract createChannel(): Promise<boolean>;
}
