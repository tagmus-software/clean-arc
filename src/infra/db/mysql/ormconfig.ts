import { ConnectionOptions } from "typeorm";
import env from "../../config/env";
export = {
  synchronize: false,
  logging: false,
  type: "mysql",
  port: env.mysql.DB_PORT,
  host: env.mysql.DB_HOST,
  database: env.mysql.DB_DATABASE,
  username: env.mysql.DB_USERNAME,
  password: env.mysql.DB_PASSWORD,
  entities: [__dirname + "/entities/**/*_entity{.js,.ts}"],
  migrations: [
    __dirname + "/migrations/**/*{.js,.ts}",
    __dirname + "/seeds/**/*{.js,.ts}",
  ],
} as ConnectionOptions;
