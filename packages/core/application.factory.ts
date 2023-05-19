import {
    HttpApplication,
    HttpApplicationConfiguration,
} from "./http/http-application";

import {
    MicroserviceApplication,
    MicroserviceConfiguration,
} from "./microservices/microservice-application";

export class ApplicationFactory {
    static async createHttpApplication(
        configuration: HttpApplicationConfiguration
    ) {
        const application = new HttpApplication(configuration);
        await application.setupLogger(configuration.logger || {});
        await application.setupDatabase(configuration.databases);
        return application;
    }

    static async createMicroserviceApplication(
        configuration: MicroserviceConfiguration
    ) {
        const microservice = new MicroserviceApplication(configuration);

        await microservice.setupLogger(configuration.logger || {});

        await microservice.setupDatabase(configuration.databases);

        return microservice;
    }
}
