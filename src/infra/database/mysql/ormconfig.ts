import { DataSource } from "typeorm";
import config from "../../config";

export const mylsqlDataSource = new DataSource({
  synchronize: false,
  logging: false,
  type: "mysql",
  port: config.mysql().DB_PORT,
  host: config.mysql().DB_HOST,
  database: config.mysql().DB_DATABASE,
  username: config.mysql().DB_USERNAME,
  password: config.mysql().DB_PASSWORD,
  entities: [
    __dirname + "/entities/*{.js,.ts}",
    __dirname + "/entities/*.entity{.js,.ts}",
  ],
  migrations: [
    __dirname + "/migrations/**/*{.js,.ts}",
    __dirname + "/seeds/**/*{.js,.ts}",
  ],
});
