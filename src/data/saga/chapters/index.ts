import { book1Chapters } from './book1'
import { book2Chapters } from './book2'
import { book3Chapters } from './book3'
import type { SagaChapter } from '../types'

export const sagaChapters: SagaChapter[] = [
  ...book1Chapters,
  ...book2Chapters,
  ...book3Chapters,
]

export function getChaptersByBook(bookId: string): SagaChapter[] {
  return sagaChapters.filter((ch) => ch.bookId === bookId)
}

export function getChapterById(id: string): SagaChapter | undefined {
  return sagaChapters.find((ch) => ch.id === id)
}

export function getAdjacentChapters(chapterId: string): {
  prev: SagaChapter | null
  next: SagaChapter | null
} {
  const index = sagaChapters.findIndex((ch) => ch.id === chapterId)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? sagaChapters[index - 1] : null,
    next: index < sagaChapters.length - 1 ? sagaChapters[index + 1] : null,
  }
}