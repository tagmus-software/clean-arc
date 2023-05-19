import { GenericError } from "@clean-arc/common";
import { logger } from "@clean-arc/core";
import amqp from "amqplib";
import { AmqpConnectionOptions } from ".";

export class AmqpConnection {
    private connection: amqp.Connection;
    private url: string;
    public name: string;
    constructor({ url, name }: AmqpConnectionOptions) {
        this.url = url;
        this.name = name || "default";
    }

    public async connect() {
        try {
            this.connection = await amqp.connect(this.url);
        } catch (error) {
            logger.error(error);
            throw new GenericError(`Amqp connection(${this.name}) error`);
        }
    }

    public async getChannel() {
        return this.connection.createChannel();
    }

    public getConnection() {
        return this.connection;
    }
}
