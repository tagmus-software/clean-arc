import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Shop1636074425732 implements MigrationInterface {
  private table = "Shop";
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
            isUnique: true,
          },

          {
            name: "Address",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "Telephone",
            type: "varchar",
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
