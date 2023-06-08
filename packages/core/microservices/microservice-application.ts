import { GenericError, Transport } from "@clean-arc/common";
import { Application, ApplicationConfiguration } from "../application";
import {
    EventConsumerType,
    EventEngines,
    LocalTransport,
    consumersMap,
} from "../event";
import { resolve } from "path";
import fs from "fs/promises";
import { logger } from "../logger";

export type MicroserviceConfiguration = {
    consumers?: EventConsumerType[] | string[] | string;
    transports?: Transport[];
} & ApplicationConfiguration;

export class MicroserviceApplication extends Application {
    /**
     *
     */
    constructor(protected configuration: MicroserviceConfiguration) {
        super(configuration);
        if (!configuration.consumers) {
            const rootDir = process.env.CLEAN_ARC_ROOT_DIR || "src/";
            this.configuration.consumers = resolve(
                __dirname,
                "../../../../",
                rootDir,
                "interfaces/consumers/"
            );
        }
    }

    get #_consumers() {
        if (!Array.isArray(this.configuration.consumers)) {
            return [this.configuration.consumers];
        }
        return this.configuration.consumers;
    }

    public async listen() {
        await Promise.all(this.setupConsumers());
        if (
            !this.configuration.transports ||
            !this.configuration.transports.length
        ) {
            this.configuration.transports = [new LocalTransport({})];
        }

        await Promise.all(this.setTransports(this.configuration.transports));
        await Promise.all(
            this.bindConsumersTransport(this.configuration.transports)
        );
    }

    private bindConsumersTransport(transports: Transport[]) {
        return transports.map((transport) => {
            const consumers = consumersMap.get(transport.connectionName) || [];
            return Promise.all(
                consumers.map((consumer) => transport.bindConsumer(consumer))
            );
        });
    }

    private setTransports(transports: Transport[]) {
        if (transports.length == 1) {
            transports[0].connectionName = "default";
        }
        return transports.map(async (transport) => {
            try {
                logger.debug(
                    `Initialing connection with transport ${transport.constructor.name} - connection ${transport.connectionName}`
                );

                process.nextTick(() => {
                    transport.setLocalConsumers(
                        consumersMap.get(transport.connectionName) || []
                    );
                });

                await transport.connect();

                logger.info(
                    `${transport.constructor.name} connection(${transport.connectionName}) established`
                );
            } catch (error) {
                logger.error(
                    error,
                    `Error trying to connect transport - ${transport.constructor.name} `
                );
            }
        });
    }
    private setupConsumers() {
        return this.#_consumers.map(async (consumer) => {
            switch (typeof consumer) {
                case "string":
                    await this.handleConsumersFromDirectory(consumer);
                    break;
                case "object":
                    break;
                default:
                    break;
            }
        });
    }

    private async handleConsumersFromDirectory(consumersPath: string) {
        let dirFiles: string[] = [];
        try {
            logger.debug(
                `Reading path "${consumersPath}" for reaching consumers`
            );
            dirFiles = await fs.readdir(resolve(consumersPath));
            dirFiles = dirFiles.filter((v) => {
                return (
                    (v.includes(".js") || v.includes(".ts")) &&
                    !v.includes(".d.ts")
                );
            });

            if (!dirFiles.length) {
                throw new GenericError(
                    `Consumers not found in the path informed ${JSON.stringify(
                        consumersPath
                    )}`
                );
            }
        } catch (err: Error | any) {
            if (err.code === "ENOENT") {
                logger.error(err, "Consumer Failed");
            }
            logger.debug(err);
            throw err;
        }

        await Promise.all(
            dirFiles.map((fileName) => {
                const path = `${consumersPath}/${fileName}`;
                logger.debug(`Importing consumer ${path}`);
                return import(path);
            })
        );
    }
}
