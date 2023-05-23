import { AMQPMessage, AMQPQueue, ConsumeParams } from "@cloudamqp/amqp-client";

export type RabbitMqQueue = {
    name: string;
    autoDelete?: boolean;
    durable?: boolean;
    exclusive?: boolean;
    passive?: boolean;
    channelId?: number;
    consumeParams?: ConsumeParams;
};

export type RabbitMqConfiguration = {
    url: string;
    queues?: RabbitMqQueue[];
};

export type RabbitMqContextParams = {
    msg: AMQPMessage;
    queue: AMQPQueue;
};
