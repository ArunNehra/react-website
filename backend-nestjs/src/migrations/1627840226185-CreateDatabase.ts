import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1627840226185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createDatabase('carbazaar', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropDatabase('carbazaar', true);
  }
}
