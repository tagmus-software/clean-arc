import { logger } from "@infra/providers/logger";
import { HttpServer } from "../../interfaces/http/http-server";
import { Application, ApplicationConfiguration } from "./application";

export type HttpApplicationConfiguration = {
    httpServer: HttpServer;
} & ApplicationConfiguration;

export class HttpApplication extends Application {
    constructor(protected configuration: HttpApplicationConfiguration) {
        super(configuration);
    }
    public async listen(port: number) {
        this.configuration.httpServer.listen(port).then(() => {
            logger.info(`Http Application started on localhost:${port}`);
        });
    }
}
