import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Employee1636074425734 implements MigrationInterface {
  private table = "Employee";
  async up(queryRunner: QueryRunner): Promise<void> {
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
            type: "varchar",
            isNullable: true,
          },

          {
            name: "Telephone",
            type: "varchar",
            isNullable: true,
          },

          {
            name: "Address",
            type: "varchar",
            isNullable: true,
          },

          {
            name: "EmploymentDate",
            type: "date",
          },
          {
            name: "EmployeeTypeId",
            type: "int",
          },
          {
            name: "ShopId",
            type: "int",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        columnNames: ["ShopId"],
        referencedColumnNames: ["ID"],
        referencedTableName: "Shop",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        columnNames: ["EmployeeTypeId"],
        referencedColumnNames: ["ID"],
        referencedTableName: "EmployeeType",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.table);
    await queryRunner.dropForeignKeys(this.table, table.foreignKeys);
    await queryRunner.dropTable(this.table);
  }
}
