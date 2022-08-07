/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'test',
  database: 'user',
  migrationsRun: true,
  entities: [`${__dirname}/entities/*{.ts, .js}`],
  migrations: [`${__dirname}/migrations/*{.ts, .js}`]
})
