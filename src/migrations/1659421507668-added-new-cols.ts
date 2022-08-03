import {MigrationInterface, QueryRunner} from "typeorm";

export class addedNewCols1659421507668 implements MigrationInterface {
    name = 'addedNewCols1659421507668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
    }

}
