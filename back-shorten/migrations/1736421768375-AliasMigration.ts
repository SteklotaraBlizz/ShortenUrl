import { MigrationInterface, QueryRunner } from 'typeorm';

export class AliasMigration1736421768375 implements MigrationInterface {
  name = 'AliasMigration1736421768375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "alias" ("id" SERIAL NOT NULL, "alias" character varying(20) NOT NULL, CONSTRAINT "PK_b1848d04b41d10a5712fc2e673c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "alias"`);
  }
}
