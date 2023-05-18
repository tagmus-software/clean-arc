import { AmqpConnection } from "./amqp-connection";

export const connectionsMap: Map<string, AmqpConnection> = new Map();

// export * from "./types";
export * from "./amqp-connection";
export * from "./rabbitmq.provider";
