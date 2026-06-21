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
    description: 'Носив її останній імператор. Кожен камінь — затемнене сонце з іншого світу.',
    origin: 'Грімхольд',
    symbol: '♛',
  },
  {
    id: 'veilshard',
    name: 'Уламок Завіси',
    rarity: 'forbidden',
    description: 'Крихітний шматок завіси між світами. Дивитися в нього — бачити те, що ще не сталося.',
    origin: 'Шпилес',
    symbol: '◇',
  },
  {
    id: 'inkwell-souls',
    name: 'Чорнильниця Душ',
    rarity: 'cursed',
    description: 'Чорнило з неї ніколи не висихає — бо воно зроблене з імен тих, кого стерли з хронік.',
    origin: 'Орден Чорнильників',
    symbol: '✒',
  },
  {
    id: 'thorn-heart',
    name: 'Серце Терня',
    rarity: 'cursed',
    description: 'Б’ється раз на століття. Кожен удар — прокляття, що передається наступному поколінню.',
    origin: 'Торнмер',
    symbol: '♥',
  },
  {
    id: 'ash-urn',
    name: 'Урна Попелу',
    rarity: 'common',
    description: 'Містить попіл першого короля Попілової Завіси. Вітер не здуває — він пам’ятає.',
    origin: 'Ашвелія',
    symbol: '⚱',
  },
  {
    id: 'iron-gauntlet',
    name: 'Залізна Рукавиця',
    rarity: 'cursed',
    description: 'Примарна рука досі стискає меч, якого вже немає. Той, хто одягне — не зможе відпустити.',
    origin: 'Айронврайт',
    symbol: '✊',
  },
  {
    id: 'dusk-mirror',
    name: 'Сутінкове Дзеркало',
    rarity: 'cursed',
    description: 'Відбиває не обличчя, а вибір, якого ти не зробив. Іноді воно плаче.',
    origin: 'Дускмір',
    symbol: '◈',
  },
  {
    id: 'night-lantern',
    name: 'Нічний Ліхтар',
    rarity: 'common',
    description: 'Світить лише для тих, хто втратив шлях. Полум’я холодне, як пам’ять.',
    origin: 'Найтфен',
    symbol: '✦',
  },
  {
    id: 'hollow-key',
    name: 'Порожній Ключ',
    rarity: 'forbidden',
    description: 'Відкриває двері, яких не існує. За ними — тиша, від якої глухнуть боги.',
    origin: 'Шпилес',
    symbol: '⚿',
  },
  {
    id: 'blood-quill',
    name: 'Перо Крові',
    rarity: 'cursed',
    description: 'Пише істину, але ціною спогадів автора. Кожне речення — рік життя.',
    origin: 'Орден Чорнильників',
    symbol: '✑',
  },
  {
    id: 'grim-seal',
    name: 'Печать Мраку',
    rarity: 'forbidden',
    description: 'Сім печаток утримують короля в Мрачній Твердині. Це — перша. Розбити — значить почати війну.',
    origin: 'Грімхольд',
    symbol: '⊛',
  },
  {
    id: 'fen-whisper',
    name: 'Шепіт Болота',
    rarity: 'common',
    description: 'Скляна куля з туманом усередині. Якщо прислухатися — болото розповість твоє майбутнє.',
    origin: 'Найтфен',
    symbol: '◎',
  },
]