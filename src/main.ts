import "reflect-metadata";
import { ExpressServer } from "@interfaces/http/server/expres-server";
import { MysqlConnection } from "@infra/database/mysql/connection";
import { ApplicationFactory } from "@infra/core/application.factory";
import config from "@infra/config";

async function bootstrap() {
    const expressServer = new ExpressServer();
    const mysqlConnection = new MysqlConnection();

    const app = await ApplicationFactory.createHttpApplication({
        httpServer: expressServer,
        databases: [mysqlConnection],
        logger: {
            engine: "pino",
            pinoOptions: {
                transport: {
                    target: "pino-pretty",
                },
            },
        },
    });
    app.listen(config.application().PORT);
}

bootstrap();
