import XLSX from 'xlsx'
import { Invoice, IProps } from './src/models/invoice.model'
import { InvoiceRepository } from './src/repositories/invoice.repo'
import { db } from './src/datasource/dbConnection'

db.initialize()
  .then(connection => {
    console.log('БД успешно подключена')
    console.log('connection', connection)
    try {
      const workbook = XLSX.readFile('./input_data/invoices.xlsx', {
        cellDates: true,
      })

      // Получаем первый лист из файла
      const sheet = workbook.Sheets[workbook.SheetNames[0]]

      // Преобразуем данные из листа в массив объектов
      const invoiceData = XLSX.utils
        .sheet_to_json<IProps>(sheet)
        .filter(data => data != null && data.hasOwnProperty('invoiceNum'))
      const invoices = Invoice.createMany(invoiceData)
      InvoiceRepository.save(invoices).then(res => {
        console.log('накладные загружены в БД')
        console.log(res)
      })
    } catch (err) {
      // Если произошла ошибка при чтении файла, выводим ее в консоль
      console.error('Ошибка при чтении файла:', err)
    }
  })
  .catch(e => {
    console.log('Ошибка подключения к БД')
    console.log('error: ', e)
  })
