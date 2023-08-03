import XLSX from 'xlsx'

export function saveToExcel(data: Array<any>, filename: string): void {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Лист 1')
  XLSX.writeFile(workbook, filename)
}
