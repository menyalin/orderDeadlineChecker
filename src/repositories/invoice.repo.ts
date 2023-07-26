import { db } from '../datasource/dbConnection'
import { Invoice } from '../models/invoice.model'

export const InvoiceRepository = db.getRepository(Invoice)
