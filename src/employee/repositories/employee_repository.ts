import { BaseRepository } from "../../infra/db/mysql/repository";
import { Employee } from "../../infra/db/mysql/entities/employee/employee_entity";
import { Injectable } from "../../infra/core/decorators";
import { createQueryBuilder } from "typeorm";

@Injectable()
export class EmployeeRepository extends BaseRepository<Employee> {
  constructor() {
    super(Employee);
  }

  public async getAllEmployees() {
    const employees = await this.queryBuilder.getMany();
    return employees;
  }

  public async createEmployee(data: Partial<Employee>) {
    const { raw } = await this.queryBuilder.insert().values(data).execute();
    data.ID = raw.insertId;
    return data;
  }

  public async findEmployeeWithRelations(id: number) {
    const employee = await this.queryBuilder
      .innerJoinAndSelect("Employee.Shop", "Shop")
      .innerJoinAndSelect("Employee.EmployeeType", "EmployeeType")
      .where("Employee.ID = :id", {
        id: Number(id),
      })
      .getOne();
    return employee;
  }

  public async findEmployee(id: number) {
    return await this.queryBuilder
      .where("Employee.ID = :id", {
        id: Number(id),
      })
      .getOne();
  }
}
