import {
    AMQPChannel,
    AMQPMessage,
    AMQPQueue,
    ConsumeParams,
} from "@cloudamqp/amqp-client";
import { RabbitMqBatchMessage } from "./batch-message";
import { RabbitMqMessage } from "./message";

export type RabbitMqBatchOptions = {
    enabled?: boolean;
    batchSize: number;
    batchTimeWait?: number;
};

export type RabbitMqQueue = {
    name: string;

    autoDelete?: boolean;
    durable?: boolean;
    exclusive?: boolean;
    passive?: boolean;
    channelId?: number;

    batch?: RabbitMqBatchOptions;

    transactionMode?: boolean;
    transactionAutoCommit?: boolean;

    messagesInParallel?: number;
    consumeParams?: ConsumeParams;
};

export type RabbitMqConfiguration = {
    url: string;
    queues?: RabbitMqQueue[];
    disabledPublish?: boolean;
};

export type RabbitMqContextParams = {
    msg: RabbitMqMessage | RabbitMqBatchMessage;
    queue: AMQPQueue;
    channel: AMQPChannel;
};
