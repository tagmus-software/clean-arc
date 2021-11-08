import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

import { employeeSeed } from "../seeds/employee_seed";
import { employeeTypesSeed } from "../seeds/employee_type_seed";

export class SeedEmployee1636074425737 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    let shop: any = await getRepository("Shop").findOne();
    employeeSeed.ShopId = shop.ID;

    const [employeeType]: any = await getRepository("EmployeeType").save(
      employeeTypesSeed
    );

    employeeSeed.EmployeeTypeId = employeeType.ID;
    await getRepository("Employee").save(employeeSeed);
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}
