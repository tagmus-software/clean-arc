import { EventContext } from "./context";

export enum EventEngines {
    RABBITMQ = "rabbitmq",
    LOCAL = "eventListener",
    SOCKETIO = "socketIO",
    KAFKA = "kafka",
}

export type EventOptions = {
    connectionName?: string;
    consumerName?: string;
    isActive?: boolean;
};

export type EventConsumerType = {
    eventName: string;
    callback: (eventContext: EventContext) => void | Promise<void>;
    target: any;
    propertyKey: string;
    options?: EventOptions;
};

export type LocalTransportConfiguration = {
    x?: number;
};
