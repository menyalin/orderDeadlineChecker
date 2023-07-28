import { Invoice } from '../models/invoice.model'
import { prismaDB } from '../datasource/dbConnection'
import { PrismaClient } from '@prisma/client'

class InvoiceRepository {
  constructor(private prismaDB: PrismaClient) {}

  async create(data: Invoice[]) {
    try {
      const savedInvoices = data.map(
        async invoice =>
          await prismaDB.invoice.upsert({
            where: { printNum: invoice.printNum },
            update: invoice,
            create: invoice,
          })
      )
      return savedInvoices
    } catch (err) {
      console.log(err)
    }
  }
}

export const InvoiceRepo = new InvoiceRepository(prismaDB)
