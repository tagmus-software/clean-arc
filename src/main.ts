import "reflect-metadata";
import { MysqlConnection } from "@infra/database/mysql/connection";
import { ApplicationFactory } from "@infra/core/application.factory";
import { ExpressServer } from "@interfaces/http/server/expres-server";
import { LoggerEngine } from "@infra/providers/logger";
import config from "@infra/config";
import { HttpApplication } from "@infra/core/http-application";

let app!: HttpApplication;

async function bootstrap() {
    const expressServer = new ExpressServer();
    const mysqlConnection = new MysqlConnection();

    app = await ApplicationFactory.createHttpApplication({
        httpServer: expressServer,
        databases: [mysqlConnection],
        logger: {
            engine: LoggerEngine.PINO,
            pinoOptions: {
                // this transport is optional and dev recommend only
                transport: {
                    target: "pino-pretty",
                },
            },
        },
    });
    app.listen(config.application().PORT);
}
bootstrap();

export default app;
