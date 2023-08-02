import { Column, Entity, PrimaryColumn } from 'typeorm'

export interface IInvoiceProps {
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

  constructor({ invoiceNum, date, orderNum }: IInvoiceProps) {
    if (invoiceNum && date && orderNum) {
      this.printNum = setPrintNum(invoiceNum, date)
      this.invoiceNum = invoiceNum || 'invalid invoice num'
      this.orderNum = orderNum
      this.date = date
    } else {
      throw new Error('Invalid Invoice properties!')
    }
  }

  static createMany(data: Array<IInvoiceProps>): Invoice[] {
    return data
      .filter(i => i && i?.invoiceNum && i?.date && i?.orderNum)
      .map(
        i =>
          new Invoice({
            invoiceNum: i.invoiceNum,
            date: new Date(i.date),
            orderNum: i.orderNum,
          })
      )
  }
}
