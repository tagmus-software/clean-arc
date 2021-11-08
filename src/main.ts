import "reflect-metadata";

import { Application } from "./application";
import { ExpressServer } from "./infra/webserver/expres-server";
import { MysqlConnection } from "./infra/db/mysql/connection";

function bootstrap() {
  const framework = new ExpressServer();
  const mysqlConnection = new MysqlConnection();

  const app = new Application(framework, mysqlConnection);
  app.listen(+process.env.NODE_PORT || 3200);
}

bootstrap();
