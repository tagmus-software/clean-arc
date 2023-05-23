import { Transport } from "@clean-arc/common";
import { EventConsumerType, logger } from "@clean-arc/core";
import Connection, { ConnectionOptions } from "rabbitmq-client";

export class RabbitMqTransport extends Transport<ConnectionOptions> {
    async bindConsumers(handlers: EventConsumerType[]): Promise<any> {}
    async connect(port?: number | undefined): Promise<void> {
        const rabbitMqConnection = new Connection({
            port,
            ...this.configuration,
        });

        return new Promise((resolve) => {
            rabbitMqConnection.on("connection", () => {
                resolve();
            });
            rabbitMqConnection.on("error", (error) => {
                logger.error(error, RabbitMqTransport.name);
                process.abort();
            });
        });
    }
}
