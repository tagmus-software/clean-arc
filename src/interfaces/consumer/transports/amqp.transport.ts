import { AmqpConnection, connectionsMap } from "@infra/providers/rabbitmq";
import config from "@infra/config";
import { AMQP_HANDLERS } from "../handlers";
import { logger } from "@infra/providers/logger";
import { AmqpConnectionOptions, Transport } from "@infra/common/microservices";

export class AmqpTransport extends Transport<AmqpConnectionOptions> {
    async connect(): Promise<any> {
        const defaultConfiguration: AmqpConnectionOptions = {
            url: config.amqp().AMQP_URL,
            name: config.amqp().AMQP_NAME,
        };

        const connection = new AmqpConnection(
            this.configuration || defaultConfiguration
        );
        connectionsMap.set(connection.name, connection);
        return connection;
    }

    async listen(): Promise<void> {
        const promises = Object.entries(AMQP_HANDLERS).map(([key, handler]) => {
            logger.info(`Started handler consumer - ${key} `);
            return handler();
        });

        await Promise.all(promises);
    }
}
