import { AmqpConnection } from "./amqp-connection";

export type AmqpConnectionsMap = Map<string, AmqpConnection>;

export type AmqpConnectionOptions = {
    url: string;
    name: string;
};
