import XLSX from 'xlsx'
import { AFileReader } from './AFileReader'
import { IInvoiceProps } from 'src/models/invoice.model'

export class InvoiceFileReader extends AFileReader {
  constructor(public filePath: string) {
    super()
  }
  readFile(): IInvoiceProps[] {
    const wb = XLSX.readFile(this.filePath, {
      cellDates: true,
    })
    const sheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(sheet)
    return data as IInvoiceProps[]
  }
}
