import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
})
