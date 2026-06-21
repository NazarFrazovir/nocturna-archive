export type Rarity = 'common' | 'cursed' | 'forbidden'

export interface Artifact {
  id: string
  name: string
  rarity: Rarity
  description: string
  origin: string
  symbol: string
}

export const rarityLabels: Record<Rarity, string> = {
  common: 'Звичайний',
  cursed: 'Проклятий',
  forbidden: 'Заборонений',
}

export const artifacts: Artifact[] = [
  {
    id: 'eclipse-crown',
    name: 'Корона Затемнення',
    rarity: 'forbidden',
    description: 'Останній імператор носив її останнім. Кожен камінь — сонце, якого більше немає.',
    origin: 'Грімхольд',
    symbol: '♛',
  },
  {
    id: 'veilshard',
    name: 'Уламок Завіси',
    rarity: 'forbidden',
    description: 'Шматок межі між світами. У ньому — майбутнє, якого ще не було.',
    origin: 'Шпилес',
    symbol: '◇',
  },
  {
    id: 'inkwell-souls',
    name: 'Чорнильниця Душ',
    rarity: 'cursed',
    description: 'Чорнило не висихає. Воно з імен тих, кого стерли.',
    origin: 'Орден Чорнильників',
    symbol: '✒',
  },
  {
    id: 'thorn-heart',
    name: 'Серце Терня',
    rarity: 'cursed',
    description: 'Б’ється раз на століття. Кожен удар — прокляття наступному роду.',
    origin: 'Торнмер',
    symbol: '♥',
  },
  {
    id: 'ash-urn',
    name: 'Урна Попелу',
    rarity: 'common',
    description: 'Попіл першого короля Ашвелії. Вітер його не чіпає.',
    origin: 'Ашвелія',
    symbol: '⚱',
  },
  {
    id: 'iron-gauntlet',
    name: 'Залізна Рукавиця',
    rarity: 'cursed',
    description: 'Стискає меч, якого немає. Відпустити — не вийде.',
    origin: 'Айронврайт',
    symbol: '✊',
  },
  {
    id: 'dusk-mirror',
    name: 'Сутінкове Дзеркало',
    rarity: 'cursed',
    description: 'Показує не обличчя — а вибір, якого ти уникнув.',
    origin: 'Дускмір',
    symbol: '◈',
  },
  {
    id: 'night-lantern',
    name: 'Нічний Ліхтар',
    rarity: 'common',
    description: 'Світить лише для зарохлих. Полум’я холодне.',
    origin: 'Найтфен',
    symbol: '✦',
  },
  {
    id: 'hollow-key',
    name: 'Порожній Ключ',
    rarity: 'forbidden',
    description: 'Відчиняє двері, яких немає. За ними — тиша.',
    origin: 'Шпилес',
    symbol: '⚿',
  },
  {
    id: 'blood-quill',
    name: 'Перо Крові',
    rarity: 'cursed',
    description: 'Пише правду. Кожне слово — рік із життя.',
    origin: 'Орден Чорнильників',
    symbol: '✑',
  },
  {
    id: 'grim-seal',
    name: 'Печать Мраку',
    rarity: 'forbidden',
    description: 'Перша з семи. Розбити — почати війну.',
    origin: 'Грімхольд',
    symbol: '⊛',
  },
  {
    id: 'fen-whisper',
    name: 'Шепіт Болота',
    rarity: 'common',
    description: 'Куля з туманом. Прислухайся — дізнаєшся, що буде.',
    origin: 'Найтфен',
    symbol: '◎',
  },
]