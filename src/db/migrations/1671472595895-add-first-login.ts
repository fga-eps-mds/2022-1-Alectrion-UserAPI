import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671472595895 implements MigrationInterface {
    name = 'default1671472595895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstLogin" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstLogin"`);
    }

}
