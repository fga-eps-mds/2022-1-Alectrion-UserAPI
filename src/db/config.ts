/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: Number(process.env.DB_PORT),
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_DATABASE}`,
  migrationsRun: true,
  entities: [`${__dirname}/entities/*{.ts, .js}`],
  migrations: [`${__dirname}/migrations/*{.ts, .js}`]
})
