import { BaseRepository } from "../../infra/db/mysql/repository";
import { EmployeeType } from "../../infra/db/mysql/entities/employee/employee_type_entity";
import { Injectable } from "../../infra/core/decorators";

@Injectable()
export class EmployeeTypeRepository extends BaseRepository<EmployeeType> {
  constructor() {
    super(EmployeeType);
  }

  public async create(data: Partial<EmployeeType>) {
    const { raw } = await this.queryBuilder.insert().values(data).execute();

    data.ID = raw.insertId;
    return data;
  }

  public async remove(id: number) {}
}
