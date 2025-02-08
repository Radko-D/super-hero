import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSuperHeroTable1738965378499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'super_hero',
        columns: [
          { name: 'id', type: 'number', isPrimary: true, isGenerated: true },
          { name: 'name', type: 'string' },
          { name: 'power', type: 'string' },
          { name: 'humility', type: 'number' },
          { name: 'createdAt', type: 'date', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('super_hero')
  }
}
