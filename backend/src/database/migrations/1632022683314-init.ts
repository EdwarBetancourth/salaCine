import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632022683314 implements MigrationInterface {
    name = 'init1632022683314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."ticket" ADD "hour" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."ticket" DROP COLUMN "hour"`);
    }

}
