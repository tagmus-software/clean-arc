import { Application, ApplicationConfiguration } from "./application";

export type MicroserviceConfiguration = {
    consumers: (() => void)[];
} & ApplicationConfiguration;

export class MicroserviceApplication extends Application {
    constructor(protected configuration: MicroserviceConfiguration) {
        super(configuration);
    }

    public async listen() {
        Object.entries(this.configuration.consumers).forEach(
            ([key, callback]) => callback()
        );
    }
}
