import { Example } from "@infra/database/mysql/entities/example.entity";
import { mylsqlDataSource } from "@infra/database/mysql/ormconfig";

export async function getAll() {
  return mylsqlDataSource.manager.find(Example);
}
