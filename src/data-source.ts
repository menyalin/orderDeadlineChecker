import { DataSource } from 'typeorm'
import { Invoice, WmsOrder, DOOrder } from './entities'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'orders',
  entities: [Invoice, WmsOrder, DOOrder],
  synchronize: true,
})
