import { GenericError } from "@infra/common/exceptions";
import amqp from "amqplib";
import { logger } from "../logger";
import { AmqpConnectionOptions } from "@infra/common/microservices";

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
