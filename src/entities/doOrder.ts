import dayjs from 'dayjs'
import { Column, Entity, PrimaryColumn } from 'typeorm'

export interface IDOOrderProps {
  orderNum: string
  acceptedDODate: Date
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
export class DOOrder {
  @PrimaryColumn()
  orderNum: string

  @Column()
  acceptedDODate: Date

  constructor(prop: IDOOrderProps) {
    if (prop) {
      this.orderNum = prop.orderNum
      this.acceptedDODate = setDate(prop.orderNum, prop.acceptedDODate)
    }
  }

  static createMany(data: Array<IDOOrderProps>): DOOrder[] {
    return data
      .filter(i => i && i.orderNum)
      .map(
        i =>
          new DOOrder({
            orderNum: i.orderNum,
            acceptedDODate: i.acceptedDODate,
          })
      )
  }
}
