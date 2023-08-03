import { dataSource } from './data-source'
import { readFile } from './fileHandlers/fileReader'
import {
  Invoice,
  IInvoiceProps,
  IDOOrderProps,
  DOOrder,
  IWmsOrderProps,
  WmsOrder,
} from './entities'
import { InvoiceRepo, WmsOrderRepo, DOOrderRepo } from './repositories'

async function storeData() {
  await dataSource.initialize()

  const invoiceData = readFile<IInvoiceProps>('./input_data/invoices.xlsx')
  const invoices = Invoice.createMany(invoiceData)

  const wmsOrdersData = readFile<IWmsOrderProps>('./input_data/wmsOrders2.xlsx')
  const wmsOrders = WmsOrder.createMany(wmsOrdersData)

  const doOrdersData = readFile<IDOOrderProps>('./input_data/do2.xlsx')
  const doOrders = DOOrder.createMany(doOrdersData)

  InvoiceRepo.create(invoices)
    .then(() => console.log('Реализации успешно загружены'))
    .catch(err => console.log('Ошибка загрузки реализаций', err))

  WmsOrderRepo.create(wmsOrders)
    .then(() => console.log('WMS-заказы успешно загружены'))
    .catch(err => console.log('Ошибка загрузки WMS-заказов', err))

  DOOrderRepo.create(doOrders)
    .then(() => console.log('ДО-заказы успешно загружены'))
    .catch(err => console.log('Ошибка загрузки ДО-заказов', err))
}

storeData()
