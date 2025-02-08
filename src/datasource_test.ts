import { DataSource } from 'typeorm'
import { SuperHero } from './models'

export const testDataSource = new DataSource({
  type: 'sqlite',
  name: 'test_super_hero_db',
  database: `${__dirname}/../test_database.sqlite`,
  entities: [SuperHero],
  migrations: [`${__dirname}/../src/migrations/*.ts`],
  synchronize: true,
  migrationsTableName: 'migrations',
  migrationsRun: true,
})
