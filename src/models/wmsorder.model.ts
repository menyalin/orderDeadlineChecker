export interface IProps {
  orderNum: string
  date: Date
  acceptedWMSDate?: Date
  searchTSDate?: Date
}

export class WmsOrder {
  orderNum: string
  date: Date
  acceptedWMSDate: Date | null
  searchTSDate: Date | null

  constructor({ acceptedWMSDate, searchTSDate, date, orderNum }: IProps) {
    this.acceptedWMSDate = acceptedWMSDate || null
    this.searchTSDate = searchTSDate || null
    this.orderNum = orderNum
    this.date = date
  }

  static createMany(data: Array<IProps>): WmsOrder[] {
    return data
      .filter(i => i !== undefined && i.orderNum)
      .map(
        i =>
          new WmsOrder({
            orderNum: i.orderNum,
            date: new Date(i.date),
            acceptedWMSDate: i.acceptedWMSDate,
            searchTSDate: i.searchTSDate,
          })
      )
  }
}
