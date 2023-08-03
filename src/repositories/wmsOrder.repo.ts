import { WmsOrder } from '../entities'
import { dataSource } from '../data-source'
import { Repository } from 'typeorm'

class WmsOrderRepository {
  repo: Repository<WmsOrder>

  constructor(
    public datasource: typeof dataSource,
    public WmsOrderModel: typeof WmsOrder
  ) {
    this.repo = datasource.getRepository(WmsOrderModel)
  }

  async create(data: WmsOrder[]) {
    try {
      const res = await this.repo.upsert(data, ['orderNum'])
      return res
    } catch (err) {
      console.log(err)
      throw new Error('error in wmsOrder repo!!')
    }
  }
}

export const WmsOrderRepo = new WmsOrderRepository(dataSource, WmsOrder)
