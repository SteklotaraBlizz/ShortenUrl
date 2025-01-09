import { MigrationInterface, QueryRunner } from 'typeorm';

export class IpMigration1736433267729 implements MigrationInterface {
  name = 'IpMigration1736433267729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ip-records" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ipAddress" character varying(64) NOT NULL, "urlId" integer NOT NULL, CONSTRAINT "PK_c96833460fca6e1766da54f0ae2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ip-records" ADD CONSTRAINT "FK_c280d228e04ff541a30f742f0a5" FOREIGN KEY ("urlId") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ip-records" DROP CONSTRAINT "FK_c280d228e04ff541a30f742f0a5"`,
    );
    await queryRunner.query(`DROP TABLE "ip-records"`);
  }
}
