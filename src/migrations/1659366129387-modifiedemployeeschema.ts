import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedemployeeschema1659366129387 implements MigrationInterface {
    name = 'modifiedemployeeschema1659366129387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
    }

}
