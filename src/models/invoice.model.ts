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

export class Invoice {
  printNum: string
  invoiceNum: string
  date: Date
  orderNum: string

  constructor({ invoiceNum, date, orderNum }: IInvoiceProps) {
    this.printNum = setPrintNum(invoiceNum, date)
    this.invoiceNum = invoiceNum
    this.orderNum = orderNum
    this.date = date
  }

  static createMany(data: Array<IInvoiceProps>): Invoice[] {
    return data
      .filter(data => data != null && data.hasOwnProperty('invoiceNum'))
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
