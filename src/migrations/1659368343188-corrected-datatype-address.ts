import {MigrationInterface, QueryRunner} from "typeorm";

export class correctedDatatypeAddress1659368343188 implements MigrationInterface {
    name = 'correctedDatatypeAddress1659368343188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" integer NOT NULL`);
    }

}
