import type { OraclePrice, OracleTier } from '../hooks/useArchiveProgress'

export interface Prophecy {
  text: string
  tier: OracleTier
  tone?: OraclePrice
}

export const prophecies: Prophecy[] = [
  { text: 'Завіса тоншає. Хтось уже дивиться.', tier: 'intro' },
  { text: 'Ти увійшов. Історія змінилась.', tier: 'intro' },
  { text: 'Оракул чує кроки — але не знає імені.', tier: 'intro' },
  { text: 'Сім держав сплять. Одна вже прокинулась.', tier: 'intro' },

  { text: 'Сім печаток тріснуть, коли сьомий знайде сьоме ім’я.', tier: 'book1' },
  { text: 'Попіл Ашвелії впаде на порожній трон.', tier: 'book1' },
  { text: 'Перша печатка вже тріщить — ніхто не оголосив.', tier: 'book1' },
  { text: 'Чорнильниця наповниться — твоїм ім’ям.', tier: 'book1', tone: 'name' },
  { text: 'Корона знайде носія. Сонце — ні.', tier: 'book1' },
  { text: 'Ти прочитав сторінку, якої не мало б існувати.', tier: 'book1', tone: 'memory' },

  { text: 'У дзеркалі побачиш ворога — і це будеш ти.', tier: 'book2' },
  { text: 'Третя держава впаде від тиші, не від меча.', tier: 'book2' },
  { text: 'Айронврайт шукає не війни. Він шукає кінця.', tier: 'book2' },
  { text: 'Шпилес зросте ще на поверх, коли правда згасне.', tier: 'book2' },
  { text: 'Туман Найтфену дійде до Грімхольду до першого снігу.', tier: 'book2' },
  { text: 'Вітер з Торнмеру принесе лист мертвим.', tier: 'book2', tone: 'sleep' },
  { text: 'Тиша вийшла з-за завіси. Вона не питає дозволу.', tier: 'book2' },

  { text: 'Сьома зірка згасне — і Архів стане явним.', tier: 'book3' },
  { text: 'Ім’я короля Грімхольду — твоє, зі сну.', tier: 'book3', tone: 'name' },
  { text: 'Останнє пророцтво не записують. Ти його читаєш.', tier: 'book3' },
  { text: 'Остання сторінка закриє книгу сама.', tier: 'book3' },
  { text: 'Перо напише кінець. Початок стереться.', tier: 'book3', tone: 'memory' },
  { text: 'Небо погасне на сім днів — не метафорою.', tier: 'book3' },
  { text: 'Брат поверне ім’я, яке світ стер.', tier: 'book3' },
  { text: 'Сьома печатка перенесеться — не туди, куди чекають.', tier: 'book3', tone: 'sleep' },
]

const TIER_ORDER: OracleTier[] = ['intro', 'book1', 'book2', 'book3']

export function getPropheciesForTier(tier: OracleTier, price?: OraclePrice | null): Prophecy[] {
  const tierIndex = TIER_ORDER.indexOf(tier)
  const available = prophecies.filter((p) => TIER_ORDER.indexOf(p.tier) <= tierIndex)

  if (!price) return available

  const toned = available.filter((p) => p.tone === price)
  return toned.length > 0 ? toned : available
}

export function pickProphecy(tier: OracleTier, price?: OraclePrice | null): string {
  const pool = getPropheciesForTier(tier, price)
  return pool[Math.floor(Math.random() * pool.length)].text
}