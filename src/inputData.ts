import './datasource/dbConnection'
import XLSX from 'xlsx'
import { Invoice, IInvoiceProps } from './models/invoice.model'
import { InvoiceRepo } from './repositories/invoice.repo'
import { WmsOrder } from './models/wmsorder.model'
const inputDataResource = [
  { file: './input_data/invoices.xlsx', model: Invoice, repo: InvoiceRepo },
  // { file: './input_data/wmsOrders.xlsx', model: WmsOrder, repo: WmsOrderRepo }
]

try {
  inputDataResource.forEach(resource => {
    const wb = XLSX.readFile(resource.file, {
      cellDates: true,
    })
    const sheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(sheet)

    const items = resource.model.createMany(data)

    resource.repo
      .create(items)
      .then(() => {
        console.log(`записи из файла ${resource.file} загружены в БД`)
      })
      .catch(err => {
        console.log('Ошибка записи в БД')
        console.log(err)
      })
  })
} catch (err) {
  // Если произошла ошибка при чтении файла, выводим ее в консоль
  console.error('Ошибка при чтении файла:', err)
}
