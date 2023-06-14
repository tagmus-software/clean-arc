import { logger } from "@clean-arc/core";
import { HttpServer } from "@clean-arc/common";
import { Application, ApplicationConfiguration } from "../application";

export type HttpApplicationConfiguration = {
    httpServer: HttpServer;
} & ApplicationConfiguration;

export class HttpApplication extends Application {
    constructor(protected configuration: HttpApplicationConfiguration) {
        super(configuration);
    }
    public async listen(port: number) {
        return this.configuration.httpServer.listen(port);
    }
}
