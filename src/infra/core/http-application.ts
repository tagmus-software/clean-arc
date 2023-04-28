import { HttpServer } from "../../interfaces/http/http-server";
import { logger } from "../providers/logger.provider";
import { Application, ApplicationConfiguration } from "./application";

type HttpApplicationConfiguration = {
  httpServer: HttpServer;
} & ApplicationConfiguration;

export class HttpApplication extends Application {
  constructor(protected configuration: HttpApplicationConfiguration) {
    super(configuration);
  }
  public async listen(port: number) {
    if (this.configuration.databases && this.configuration.databases.length) {
      await Promise.all(
        this.configuration.databases.map(async (d) => {
          try {
            await d.connect();
          } catch (error) {
            console.log(`Error trying to establish database connection`);
          }
        })
      );
    }

    this.configuration.httpServer.listen(port).then(() => {
      logger.info(`Http Application started on localhost:${port}`);
    });
  }
}
