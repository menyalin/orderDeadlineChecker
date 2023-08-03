import dayjs, { Dayjs } from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(weekday)
dayjs.extend(isSameOrAfter)

const getNormalTSSearchDate = (invoiceDate: Date, dayOfWeek: number): Date => {
  let targetDate: Dayjs
  if ([1, 2].includes(dayOfWeek)) {
    targetDate = dayjs(invoiceDate)
      .startOf('day')
      .subtract(4, 'day')
      .add(dayOfWeek === 2 ? 13 : 15, 'hour')
  } else if ([0, 3, 4, 5, 6])
    targetDate = dayjs(invoiceDate)
      .startOf('day')
      .subtract(2, 'day')
      .add(15, 'hour')
  else throw new Error('invalid day of week!')

  return targetDate.toDate()
}

const getTSSearchStatus = (
  targetDate: Date,
  searchTSDate: Date,
  invoiceDate: Date
): tsSearchStatus => {
  if (targetDate >= searchTSDate) return tsSearchStatus.inTime

  if (dayjs(invoiceDate).isSame(searchTSDate, 'day'))
    return tsSearchStatus.inDay
  const nextDayBefore12 = dayjs(targetDate).add(12, 'hours')
  if (nextDayBefore12.isSameOrAfter(searchTSDate, 'hour'))
    return tsSearchStatus.nextDayBefore12
  else return tsSearchStatus.nextDayAfter12
}

export interface IAnaliticProps {
  invoice_printNum: string
  invoice_invoiceNum: string
  invoice_date: Date
  invoice_orderNum: string
  wms_acceptedWMSDate: Date
  wms_searchTSDate?: Date
  do_acceptedDODate?: Date
}
export enum tsSearchStatus {
  inTime = 'Норма',
  nextDayBefore12 = 'До 12:00 след.дня',
  nextDayAfter12 = 'После 12:00 след.дня',
  inDay = 'День в день',
}

export class AnaliticItem {
  printNum: string
  invoiceNum: string
  date: Date
  orderNum: string
  acceptedWMSDate: Date
  searchTSDate?: Date
  acceptedDODate?: Date
  saleDayNumber: number
  normalTSSearchDate: Date
  tsSearchStatus: tsSearchStatus

  constructor(prop: IAnaliticProps) {
    this.printNum = prop.invoice_printNum
    this.invoiceNum = prop.invoice_invoiceNum
    this.date = prop.invoice_date
    this.orderNum = prop.invoice_orderNum
    this.acceptedWMSDate = prop.wms_acceptedWMSDate
    this.searchTSDate = prop.wms_searchTSDate
    this.acceptedDODate = prop.do_acceptedDODate
    this.saleDayNumber = dayjs(prop.invoice_date).weekday()
    this.normalTSSearchDate = getNormalTSSearchDate(
      this.date,
      this.saleDayNumber
    )
    this.tsSearchStatus = getTSSearchStatus(
      this.normalTSSearchDate,
      this.searchTSDate,
      this.date
    )
  }
}
