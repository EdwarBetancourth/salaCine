import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632502255082 implements MigrationInterface {
    name = 'init1632502255082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "concurrent" ("id" SERIAL NOT NULL, "ticket_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_2acdc691e83f4c27b411325e26d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "concurrent"`);
    }

}
