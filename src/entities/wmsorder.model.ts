import dayjs from 'dayjs'
import { Entity, PrimaryColumn, Column } from 'typeorm'

export interface IWmsOrderProps {
  orderNum: string
  date: Date | string
  acceptedWMSDate?: Date
  searchTSDate?: Date
  status?: string
}

const setDate = (
  orderNum: string,
  inputDate: string | Date | number | undefined
): Date | null => {
  if (inputDate === undefined) return null
  if (typeof inputDate === 'number' || !dayjs(inputDate).isValid())
    throw new Error(`orderNum: ${orderNum} - date is invalid: ${inputDate}`)
  return inputDate instanceof Date ? inputDate : new Date(inputDate)
}
@Entity()
export class WmsOrder {
  @PrimaryColumn()
  orderNum: string

  @Column()
  date: Date

  @Column({ nullable: true })
  acceptedWMSDate?: Date | null

  @Column({ nullable: true })
  searchTSDate?: Date | null

  constructor({
    acceptedWMSDate,
    searchTSDate,
    date,
    orderNum,
  }: IWmsOrderProps) {
    if (!date)
      throw new Error(`orderNum: ${orderNum} - date is invalid: ${date}`)
    this.acceptedWMSDate = setDate(orderNum, acceptedWMSDate)
    this.searchTSDate = setDate(orderNum, searchTSDate)
    this.orderNum = orderNum
    this.date = setDate(orderNum, date) as Date
  }

  static createMany(data: Array<IWmsOrderProps>): WmsOrder[] {
    return data
      .filter(i => i !== undefined && !!i.orderNum && i.status === 'Отгружен')
      .map(
        i =>
          new WmsOrder({
            orderNum: i.orderNum,
            date: i.date,
            acceptedWMSDate: i.acceptedWMSDate,
            searchTSDate: i.searchTSDate,
          })
      )
  }
}
