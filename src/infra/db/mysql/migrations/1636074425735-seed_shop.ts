import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

import { shopSeed } from "../seeds/shop_seed";

export class SeedShop1636074425735 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("Shop").save(shopSeed);
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}
