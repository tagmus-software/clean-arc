import "reflect-metadata";

import { HttpApplication } from "./app/application";
import { ExpressServer } from "./interfaces/http/server/expres-server";
import { MysqlConnection } from "./infra/database/mysql/connection";
import { LoggerManager } from "./infra/providers/logger.provider";

import config from "./infra/config";

function bootstrap() {
  const expressServer = new ExpressServer();
  const mysqlConnection = new MysqlConnection();
  LoggerManager.init();
  const app = new HttpApplication({
    httpServer: expressServer,
    databases: [mysqlConnection],
  });

  app.listen(config.application.PORT);
}

bootstrap();
