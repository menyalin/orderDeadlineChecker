import { readFile } from './fileReader/fileReader'
import { Invoice, IInvoiceProps } from './entities/invoice.model'
import { InvoiceRepo } from './repositories/invoice.repo'
import { IWmsOrderProps, WmsOrder } from './entities/wmsorder.model'
import { WmsOrderRepo } from './repositories/wmsOrder.repo'
import { dataSource } from './data-source'

async function storeData() {
  // const invoiceData = readFile<IInvoiceProps>('./input_data/invoices.xlsx')
  // const invoices = Invoice.createMany(invoiceData)

  // const wmsOrdersData = readFile<IWmsOrderProps>('./input_data/wmsOrders.xlsx')
  // const wmsOrders = WmsOrder.createMany(wmsOrdersData)
  try {
    await dataSource.initialize()
    console.log('db connected')
  } catch (e) {
    console.log('db connection error', e)
  }
  // InvoiceRepo.create(invoices)
  //   .then(() => console.log('Реализации успешно загружены'))
  //   .catch(err => console.log('Ошибка загрузки реализаций', err))

  // WmsOrderRepo.create(wmsOrders)
  //   .then(() => console.log('WMS-заказы успешно загружены'))
  //   .catch(err => console.log('Ошибка загрузки WMS-заказов', err))
}

storeData()
