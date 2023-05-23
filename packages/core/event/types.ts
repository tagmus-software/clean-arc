export enum EventEngines {
    RABBITMQ = "rabbitmq",
    LOCAL = "eventListener",
    SOCKETIO = "socketIO",
    KAFKA = "kafka",
}

export type EventConsumerType = {
    eventName: string;
    connectionName?: string;
    callback: () => void | Promise<void>;
    target: any;
    propertyKey: string;
};
