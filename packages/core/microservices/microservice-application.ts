import { GenericError, Transport } from "@clean-arc/common";
import { Application, ApplicationConfiguration } from "../application";
import {
    EventConsumerType,
    EventEngines,
    LocalTransport,
    registeredConsumers,
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
        if (!configuration.consumers) {
            configuration.consumers = resolve(
                __dirname,
                "../",
                "src/",
                "interfaces"
            );
        }
        super(configuration);
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

        this.bindConsumersTransport()
    }

    private bindConsumersTransport() {
        registeredConsumers.forEach((consumer) => {
            if(consumer.connectionName === ) {

            }
        })
    }

    private setTransports(transports: Transport[]) {
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
