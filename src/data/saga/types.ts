export type ChapterType = 'prologue' | 'chapter' | 'epilogue'

export interface SagaChapter {
  id: string
  bookId: string
  type: ChapterType
  number: number | null
  title: string
  pov: string
  povCharacterId: string
  realmId: string | null
  realmName: string | null
  paragraphs: string[]
  marginalia?: string
}