import { Connection, createConnection } from "typeorm";

import { Database } from "../database";

export class MysqlConnection implements Database<Connection> {
  async connect() {
    return {} as any;
  }
}
