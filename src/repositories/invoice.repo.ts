import { Invoice, IAnaliticProps } from '../entities'
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
      const res = await this.repo.upsert(data, {
        conflictPaths: ['printNum'],
      })
      return res
    } catch (err) {
      console.log(err)
      throw new Error('error in invoice repo!!')
    }
  }

  async getAnaliticsDataByPeriod(
    startDate: Date,
    endDate: Date
  ): Promise<IAnaliticProps[]> {
    const res = await this.repo
      .createQueryBuilder('invoice')
      .leftJoin('wms_order', 'wms', 'invoice.orderNum = wms.orderNum')
      .addSelect(['wms.acceptedWMSDate', 'wms.searchTSDate'])
      .leftJoin('do_order', 'do', 'invoice.orderNum = do.orderNum')
      .addSelect(['do.acceptedDODate'])
      .where('invoice.date >= :startDate', { startDate })
      .andWhere('invoice.date <= :endDate', { endDate })
      .execute()
    return res as IAnaliticProps[]
  }
}

export const InvoiceRepo = new InvoiceRepository(dataSource, Invoice)
