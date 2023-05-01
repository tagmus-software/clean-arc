import {
  HttpApplication,
  HttpApplicationConfiguration,
} from "./http-application";
import { ApplicationConfiguration } from "./application";

export class ApplicationFactory {
  static async createHttpApplication(
    configuration: HttpApplicationConfiguration
  ) {
    const application = new HttpApplication(configuration);
    await application.setupLogger(configuration.logger || {});
    await application.initDatabasesConnection(configuration.databases);
    return application;
  }

  static async createMicroserviceApplication(
    configuration: ApplicationConfiguration
  ) {}
}
