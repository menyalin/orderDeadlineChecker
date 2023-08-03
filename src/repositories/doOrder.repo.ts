import { DOOrder } from '../entities'
import { dataSource } from '../data-source'
import { Repository } from 'typeorm'

class DOOrderRepository {
  repo: Repository<DOOrder>

  constructor(
    public datasource: typeof dataSource,
    public DOOrderModel: typeof DOOrder
  ) {
    this.repo = datasource.getRepository(DOOrderModel)
  }

  async create(data: DOOrder[]) {
    try {
      const res = await this.repo.upsert(data, ['orderNum'])
      return res
    } catch (err) {
      console.log(err)
      throw new Error('error in doOrder repo!!')
    }
  }
}

export const DOOrderRepo = new DOOrderRepository(dataSource, DOOrder)
