export {
  sagaPremise,
  sagaThemes,
  sagaBooks,
  sagaChapters,
  getChaptersByBook,
  getChapterById,
  getAdjacentChapters,
} from './saga/index'

export type { SagaBook, SagaChapter, ChapterType } from './saga/index'

/** @deprecated Use sagaBooks instead */
export const sagaActs = [
  {
    id: 'book-1',
    number: 1,
    title: 'Архів відкривається',
    subtitle: 'Книга перша',
    summary:
      'Перша печатка тріщить без оголошення. Сім держав ще не знають, що війна вже почалась.',
    events: [] as string[],
  },
  {
    id: 'book-2',
    number: 2,
    title: 'Сім претензій',
    subtitle: 'Книга друга',
    summary:
      'Кожна держава має свого короля, свою кров і свою брехню. З-за завіси виходить тиша.',
    events: [] as string[],
  },
  {
    id: 'book-3',
    number: 3,
    title: 'Останнє Затемнення',
    subtitle: 'Книга третя',
    summary:
      'Небо гасне на сім днів. Сьома печатка переноситься. Брат повертає сестрі стерте ім’я.',
    events: [] as string[],
  },
]