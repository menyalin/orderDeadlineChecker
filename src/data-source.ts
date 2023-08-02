import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Invoice } from './entities/invoice.model'
import { WmsOrder } from './entities/wmsorder.model'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'orders',
  entities: [Invoice, WmsOrder],
  synchronize: true,
})
