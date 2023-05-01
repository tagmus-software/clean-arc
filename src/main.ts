import "reflect-metadata";

import { ExpressServer } from "@interfaces/http/server/expres-server";
import { MysqlConnection } from "@infra/database/mysql/connection";
import { HttpApplication } from "@infra/core/http-application";
import config from "@infra/config";

function bootstrap() {
  const expressServer = new ExpressServer();
  const mysqlConnection = new MysqlConnection();
  const app = new HttpApplication({
    httpServer: expressServer,
    databases: [mysqlConnection],
  });

  app.listen(config.application.PORT);
}

bootstrap();
