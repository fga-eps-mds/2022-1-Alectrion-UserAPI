import { MigrationInterface, QueryRunner } from 'typeorm'

export class createUsers1664151733139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO \"user\"(name, email, job, role, username, password) VALUES('admin', 'admin@admin.com', 'generico', 'administrador', 'admin', '$2a$04$cZtiKglD8y45.1U8QAGhOOPxggFzE4WwDl5Er.fs5XmAVASWysdtm')"
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
