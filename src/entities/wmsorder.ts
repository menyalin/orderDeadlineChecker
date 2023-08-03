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

  @Column()
  acceptedWMSDate: Date

  @Column()
  searchTSDate: Date

  constructor(prop: IWmsOrderProps) {
    if (prop) {
      this.orderNum = prop.orderNum
      this.date = setDate(prop.orderNum, prop.date) as Date
      this.acceptedWMSDate = setDate(prop.orderNum, prop.acceptedWMSDate)
      this.searchTSDate = prop.searchTSDate || this.date
    }
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
