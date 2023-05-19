import { logger } from "@clean-arc/core/logger";
import { Consumers, Transport } from "@clean-arc/common/microservices";
import { AmqpConnection } from ".";
import { AmqpConnectionOptions } from ".";

export class AmqpTransport extends Transport<AmqpConnectionOptions> {
    async connect(): Promise<any> {
        const connection = new AmqpConnection(this.configuration);
        return connection as AmqpConnection;
    }

    async listen(handlers: Consumers): Promise<void> {
        const promises = Object.entries(handlers).map(([key, handler]) => {
            logger.info(`Started handler consumer - ${key} `);
            return handler();
        });

        await Promise.all(promises);
    }
}
