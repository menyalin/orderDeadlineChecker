import * as XLSX from 'xlsx'

export function readFile<T>(filePath: string): T[] {
  try {
    const wb = XLSX.readFile(filePath, {
      cellDates: true,
    })
    const sheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(sheet)
    return data as T[]
  } catch (e) {
    console.error('Ошибка загрузки файла:', filePath)
    throw e
  }
}
