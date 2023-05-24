import { AMQPMessage } from "@cloudamqp/amqp-client";

export interface RabbitMqMessageObj<T = unknown> {
    id?: string;
    headers: any;
    deliveryTag: number;
    consumerTag: string;
    body: T;
}
export class RabbitMqMessage {
    deliveryTag: number;
    constructor(public msg: AMQPMessage) {
        this.deliveryTag = msg.deliveryTag;
    }

    async ack() {
        return this.msg.ack();
    }

    async nack() {
        return this.msg.nack();
    }

    toJson<T>(): RabbitMqMessageObj<T> {
        return {
            id: this.msg.properties.messageId,
            headers: this.msg.properties.headers,
            deliveryTag: this.msg.deliveryTag,
            consumerTag: this.msg.consumerTag,
            body: JSON.parse(this.msg.bodyString() || ""),
        };
    }
}
