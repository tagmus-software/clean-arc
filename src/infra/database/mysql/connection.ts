import { Connection, createConnection } from "typeorm";

import { Database } from "../database";
import ormconfig from "./ormconfig";

export class MysqlConnection implements Database<Connection> {
  async connect() {
    const conn = await createConnection(ormconfig);

    return conn;
  }
}
