import { logger } from "@infra/providers/logger.provider";
import { Application, ApplicationConfiguration } from "./application";
import { ConsumerHandler } from "@infra/common/consumers";

export type MicroserviceConfiguration = {
    consumers: Record<string, ConsumerHandler>;
} & ApplicationConfiguration;

export class MicroserviceApplication extends Application {
    constructor(protected configuration: MicroserviceConfiguration) {
        super(configuration);
    }

    public async listen() {
        Object.entries(this.configuration.consumers).forEach(
            ([key, callback]) => {
                logger.info(`Starting the ${key}-consumer`);
                callback();
            }
        );
    }
}
