import XLSX from 'xlsx'

// Определяем класс Model
class Model {
  // Здесь вы можете добавить свои свойства и методы для модели
  constructor(
    public name: string,
    public age: number,
    public gender: string
  ) {}
}

// Пытаемся открыть excel файл из папки input_data
try {
  const workbook = XLSX.readFile('./input_data/data.xlsx', { cellDates: true })

  // Получаем первый лист из файла
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  // Преобразуем данные из листа в массив объектов
  const data = XLSX.utils.sheet_to_json(sheet)

  // Перебираем массив объектов и создаем из них экземпляры класса Model
  // const models = data.map(obj => new Model(obj.Name, obj.Age, obj.Gender))
} catch (err) {
  // Если произошла ошибка при чтении файла, выводим ее в консоль
  console.error('Ошибка при чтении файла:', err)
}
