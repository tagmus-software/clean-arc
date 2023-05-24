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
            this.configuration.consumers = resolve(
                __dirname,
                "../",
                "src/",
                "interfaces"
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
                await transport.connect();

                logger.info(
                    `${transport.constructor.name} connection established`
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
            dirFiles = await fs.readdir(resolve(consumersPath));
        } catch (err: Error | any) {
            if (err.code === "ENOENT") {
                logger.error(err, "Consumer Failed");
            }
        }

        await Promise.all(
            dirFiles.map((fileName) => import(`${consumersPath}/${fileName}`))
        );
    }
}
