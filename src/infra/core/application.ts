import {
    buildLogger,
    logger,
    LoggerOptions,
} from "@infra/providers/logger.provider";
import { Database } from "@infra/database/database";

export interface ApplicationConfiguration {
    databases: Database<unknown>[];
    logger?: LoggerOptions;
}

export abstract class Application {
    constructor(protected configuration: ApplicationConfiguration) {}

    public async initDatabasesConnection(
        databases: ApplicationConfiguration["databases"]
    ) {
        if (databases && databases.length) {
            const promises = databases.map(async (d) => {
                try {
                    await d.connect();
                    logger.info(`${d.constructor.name} connection established`);
                } catch (error) {
                    logger.error(
                        error,
                        `Error trying to establish database connection`
                    );
                }
            });

            await Promise.all(promises);
        }
    }

    public async setupLogger(loggerOptions: LoggerOptions) {
        loggerOptions = Object.assign(
            { enabled: true, engine: "console" },
            loggerOptions
        );
        await buildLogger(loggerOptions);
    }

    abstract listen(port?: number): Promise<void>;
}
