import { SelectQueryBuilder, getRepository } from "typeorm";

export abstract class BaseRepository<T> {
  protected queryBuilder: SelectQueryBuilder<T>;
  constructor(entity) {
    this.queryBuilder = getRepository<T>(entity).createQueryBuilder();
  }
}
