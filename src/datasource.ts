import { DataSource } from 'typeorm'
import { SuperHero } from './models'

export const dataSource = new DataSource({
  type: 'sqlite',
  name: 'super_hero_db',
  database: `database.sqlite`,
  entities: [SuperHero],
  migrations: [`${__dirname}/../src/migrations/*.ts`],
  migrationsTableName: 'migrations',
  migrationsRun: true,
})
