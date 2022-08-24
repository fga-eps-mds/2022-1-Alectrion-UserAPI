/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  migrationsRun: true,
  entities: [`${__dirname}/entities/*{.ts, .js}`],
  migrations: [`${__dirname}/migrations/*{.ts, .js}`],
  ssl: { rejectUnauthorized: false }
})
