import { Invoice } from '../entities/invoice.model'
import { dataSource } from '../data-source'
import { Repository } from 'typeorm'

class InvoiceRepository {
  repo: Repository<Invoice>

  constructor(
    public datasource: typeof dataSource,
    public InvoiceModel: typeof Invoice
  ) {
    this.repo = datasource.getRepository(InvoiceModel)
  }

  async create(data: Invoice[]) {
    try {
      const res = await this.repo.upsert(data, ['printNum'])
      return res
    } catch (err) {
      console.log(err)
    }
  }
}

export const InvoiceRepo = new InvoiceRepository(dataSource, Invoice)
