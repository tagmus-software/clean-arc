import "reflect-metadata";

import { Application } from "./application";
import { ExpressApplication } from "./main/frameworks/express";
import { MysqlConnection } from "./infra";

function bootstrap() {
  const databaseConnection = new MysqlConnection();
  const expressApplication = new ExpressApplication();
  const app = new Application(databaseConnection, expressApplication);
  app.listen(3200);
}

bootstrap();
