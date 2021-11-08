import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { EmployeeTypeEnum } from "../../../common/enums";

export class EmployeeType1636074425733 implements MigrationInterface {
  private table = "EmployeeType";
  async up(queryRunner: QueryRunner): Promise<void> {
    const employeeTypes = Object.keys(EmployeeTypeEnum);
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          {
            name: "ID",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
            isNullable: false,
          },
          {
            name: "Name",
            type: "enum",
            enum: employeeTypes,
          },

          {
            name: "Salary",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
        ],
      }),
      true
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
    // await queryRunner.dropIndex("EmployeeType", "IDX_QUESTION_NAME");
  }
}
