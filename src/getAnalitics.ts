import { dataSource } from './data-source'
import { AnaliticItem } from './entities'
import { saveToExcel } from './fileHandlers/saveToExcel'
import { InvoiceRepo } from './repositories'

async function getData() {
  const startDate = new Date('2023-07-01')
  const endDate = new Date('2024-01-01')
  await dataSource.initialize()
  const rawData = await InvoiceRepo.getAnaliticsDataByPeriod(startDate, endDate)
  const analiticItems: AnaliticItem[] = rawData.map(i => new AnaliticItem(i))
  saveToExcel(analiticItems, './output/result.xlsx')
}

getData()
