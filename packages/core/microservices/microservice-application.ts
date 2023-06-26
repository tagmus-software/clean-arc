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
    get log() {
        return logger.append({ file: __filename.split("/").pop() });
    }
    get #transports() {
        if (this.configuration.transports?.length == 1) {
            this.configuration.transports[0].connectionName = "default";
        }
        return this.configuration.transports || [];
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

        await Promise.all(this.setTransports());

        await Promise.all(this.bindConsumersTransport());
    }

    private bindConsumersTransport() {
        this.log.trace(
            { transports: this.#transports },
            `Binding consumers for transports`
        );

        return this.#transports.map((transport) => {
            const consumers = consumersMap.get(transport.connectionName) || [];

            this.log.trace(
                { consumers },
                "consumers found for transport and started binding"
            );

            return Promise.all(
                consumers.map((consumer) => transport.bindConsumer(consumer))
            );
        });
    }

    private setTransports() {
        return this.#transports.map(async (transport) => {
            try {
                this.log.debug(
                    `Initialing connection with transport ${transport.constructor.name} - connection ${transport.connectionName}`
                );

                this.log.trace("Setting active local consumer");

                process.nextTick(() => {
                    transport.setLocalConsumers(
                        consumersMap.get(transport.connectionName) || []
                    );
                });

                await transport.connect();
                this.log.info(
                    `${transport.constructor.name} connection(${transport.connectionName}) established`
                );
            } catch (error) {
                this.log.error(
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
                this.log.error(err, "Consumer Failed");
            }
            this.log.debug(err);
            throw err;
        }

        await Promise.all(
            dirFiles.map((fileName) => {
                const path = `${consumersPath}/${fileName}`;
                this.log.debug(`Importing consumer ${path}`);
                return import(path);
            })
        );
    }
}
