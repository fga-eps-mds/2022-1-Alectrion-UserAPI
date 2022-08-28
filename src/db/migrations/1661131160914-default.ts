import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1661131160914 implements MigrationInterface {
  name = 'default1661131160914'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`
    )
  }
}
