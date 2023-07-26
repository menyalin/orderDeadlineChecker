import { Entity, PrimaryColumn, Column } from 'typeorm'

export interface IProps {
  invoiceNum: string
  date: Date
  orderNum: string
}
const setPrintNum = (num: string, date: Date): string => {
  let res = '4-'
  const numberStr = Number.parseInt(num.substring(5)).toString()
  const yearStr = date.getFullYear().toString().substring(2)
  return res + numberStr + '/' + yearStr
}

@Entity()
export class Invoice {
  @PrimaryColumn()
  printNum: string

  @Column()
  invoiceNum: string

  @Column()
  date: Date

  @Column()
  orderNum: string

  constructor({ invoiceNum, date, orderNum }: IProps) {
    this.invoiceNum = invoiceNum
    this.orderNum = orderNum
    this.date = date
    this.printNum = setPrintNum(invoiceNum, date)
  }

  static createMany(data: Array<IProps>): Invoice[] {
    return data
      .filter(i => i !== undefined && i.invoiceNum)
      .map(
        i =>
          new Invoice({
            invoiceNum: i?.invoiceNum,
            date: new Date(i?.date),
            orderNum: i?.orderNum,
          })
      )
  }
}
