import { WmsOrder } from '../entities/wmsorder.model'
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
      const res = await this.repo.upsert(data, ['printNum'])
      return res
    } catch (err) {
      console.log(err)
    }
  }
}

export const WmsOrderRepo = new WmsOrderRepository(dataSource, WmsOrder)
