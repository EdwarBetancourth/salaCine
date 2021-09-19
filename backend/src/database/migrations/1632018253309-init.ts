import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632018253309 implements MigrationInterface {
    name = 'init1632018253309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Movie" ("code" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_8087bdd5550ee73af45f3c2aab9" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "movie_id" integer NOT NULL, "room_id" integer NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "rol" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "Movie"`);
    }

}
