import { DataSource } from 'typeorm'
import { Invoice } from '../models/invoice.model'

export const db = new DataSource({
  type: 'sqlite',
  database: './db/db.sqlite',
  entities: [Invoice],
  synchronize: true,
})
