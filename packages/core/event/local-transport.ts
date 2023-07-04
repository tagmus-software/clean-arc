import { Transport } from "@clean-arc/common";
import { EventConsumerType, LocalTransportConfiguration } from "./";

export class LocalTransport extends Transport<LocalTransportConfiguration> {
    async bindConsumer(handlers: EventConsumerType): Promise<void> {
        // TODO: Implement local event emitter
    }
    async connect(): Promise<void> {
        // TODO: Implement local connection
    }
}
