import { DataSource } from "typeorm";
import { Database } from "../database";
import { mylsqlDataSource } from "./ormconfig";

export class MysqlConnection implements Database<DataSource> {
  async connect() {
    return mylsqlDataSource.initialize().then((c) => {
      return c;
    });
  }
}
