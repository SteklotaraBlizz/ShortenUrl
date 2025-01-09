import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1736419171827 implements MigrationInterface {
  name = 'Initial1736419171827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "urls" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "shortUrl" character varying(128) NOT NULL, "originalUrl" character varying(512) NOT NULL, "clickCount" integer NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "urls"`);
  }
}
