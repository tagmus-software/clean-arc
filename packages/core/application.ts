import { Database } from "@clean-arc/common";
import { LoggerOptions, buildLogger, logger } from "@clean-arc/core";

export interface ApplicationConfiguration {
    databases: Database<unknown>[];
    logger?: LoggerOptions;
}

export abstract class Application {
    constructor(protected configuration: ApplicationConfiguration) {}

    public async setupDatabase(
        databases: ApplicationConfiguration["databases"]
    ) {
        if (databases && databases.length) {
            await Promise.all(this.initDatabasesConnection(databases));
        }
    }

    public async setupLogger(loggerOptions: LoggerOptions) {
        loggerOptions = Object.assign(
            { enabled: true, engine: "console" },
            loggerOptions
        );
        await buildLogger(loggerOptions);
    }

    public setupControllers() {
        logger.info("EMPTY setup");
    }

    abstract listen(port?: number): Promise<void>;

    private initDatabasesConnection(
        databases: ApplicationConfiguration["databases"]
    ) {
        return databases.map(async (d) => {
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
    }
}
