import { AMQPMessage } from "@cloudamqp/amqp-client";

export interface RabbitMqMessageObj<BodyType = unknown> {
    id?: string;
    headers: any;
    deliveryTag: number;
    consumerTag: string;
    correlationId?: string;
    body: BodyType;
}
export class RabbitMqMessage<BodyType = any> {
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

    toJson(): RabbitMqMessageObj<BodyType> {
        return {
            id: this.msg.properties.messageId,
            headers: this.msg.properties.headers,
            deliveryTag: this.msg.deliveryTag,
            consumerTag: this.msg.consumerTag,
            correlationId: this.msg.properties.correlationId,
            body: JSON.parse(this.msg.bodyString() || ""),
        };
    }
}
