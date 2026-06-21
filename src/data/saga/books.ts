export interface SagaBook {
  id: string
  number: number
  title: string
  subtitle: string
  summary: string
  status: 'available' | 'coming'
}

export const sagaBooks: SagaBook[] = [
  {
    id: 'book-1',
    number: 1,
    title: 'Архів відкривається',
    subtitle: 'Книга перша',
    summary:
      'Перша печатка тріщить без оголошення. Сім держав ще не знають, що війна вже почалась — тихо, як чорнило, що сохне на сторінці, якої не мало б існувати.',
    status: 'available',
  },
  {
    id: 'book-2',
    number: 2,
    title: 'Сім претензій',
    subtitle: 'Книга друга',
    summary:
      'Кожна держава має свого короля, свою кров і свою брехню. Старі союзи горять швидше за Ембервелл. З-за завіси виходить не армія — тиша.',
    status: 'available',
  },
  {
    id: 'book-3',
    number: 3,
    title: 'Останнє Затемнення',
    subtitle: 'Книга третя',
    summary:
      'Небо гасне на сім днів. Сьома печатка не ламається і не зміцнюється — вона переноситься. І в кінці, у попелі, брат повертає сестрі ім’я, яке світ стер.',
    status: 'available',
  },
]