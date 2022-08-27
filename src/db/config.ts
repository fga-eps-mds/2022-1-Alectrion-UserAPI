/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  migrationsRun: true,
  ssl: { rejectUnauthorized: false },
  entities: [`${__dirname}/entities/*{.ts, .js}`],
  migrations: [`${__dirname}/migrations/*{.ts, .js}`]
})
