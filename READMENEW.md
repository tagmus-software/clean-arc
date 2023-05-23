# @CLEAN-ARC A Decentralized Framework For NodeJS

### HTTP Application setup

```typescript
import "reflect-metadata";
import { ApplicationFactory, LoggerEngine } from "@clean-arc/core";
import { ExpressServer } from "@clean-arc/express";
import { MysqlConnection } from "@infra/database/mysql/connection";
import { routes } from "@interfaces/http/routes";
import {
    errorHandlerMiddleware,
    loggerMiddleware,
} from "@interfaces/http/middlewares";
import config from "@infra/config";

async function bootstrap() {
    const expressServer = new ExpressServer();
    const mysqlConnection = new MysqlConnection();
    const app = await ApplicationFactory.createHttpApplication({
        httpServer: expressServer,
        databases: [mysqlConnection],
        logger: {
            engine: LoggerEngine.PINO,
            pinoOptions: {
                // this transport is optional and dev env only
                transport: {
                    target: "pino-pretty",
                },
            },
        },
    });

    expressServer.middlewares([loggerMiddleware]);
    expressServer.routes(routes);
    expressServer.middlewares([errorHandlerMiddleware]);

    await app.listen(config.application().PORT);
}
bootstrap();
```
