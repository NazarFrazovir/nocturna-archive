export interface Realm {
  id: string
  name: string
  stateType: string
  capital: string
  curse: string
  description: string
  extendedLore: string
  symbol: string
  danger: number
  color: string
  glow: string
  gradientFrom: string
  gradientTo: string
  mapPath: string
  labelX: number
  labelY: number
  pinX: number
  pinY: number
}

export const realms: Realm[] = [
  {
    id: 'ashveil',
    name: 'Ашвелія',
    stateType: 'Королівство',
    capital: 'Ембервелл',
    curse: 'Вічний попіл',
    description: 'Північ без сонця. Попіл падає без кінця — зернинка за зернинкою, як забутий спогад.',
    extendedLore: 'Ембервелл стоїть під попелом. Рід вимер. Трон чекає — але ніхто не сідає вдруге.',
    symbol: '☁',
    danger: 4,
    color: '#5a5a5a',
    glow: 'rgba(160, 140, 120, 0.6)',
    gradientFrom: '#4a4540',
    gradientTo: '#1e1c1a',
    mapPath: 'M 340,95 C 400,40 500,35 590,65 C 650,85 680,130 660,175 C 620,200 520,195 440,185 C 370,175 320,140 340,95 Z',
    labelX: 500,
    labelY: 115,
    pinX: 510,
    pinY: 145,
  },
  {
    id: 'thornmere',
    name: 'Торнмер',
    stateType: 'Князівство',
    capital: 'Ліорвуд',
    curse: 'Коріння пам\'яті',
    description: 'Князівство боліт. Імена тут не живуть довго — їх поглинає коріння.',
    extendedLore: 'Ліорвуд росте вглиб, не вшир. Дерева старші за хроніки. Посланці повертаються без імен.',
    symbol: '☽',
    danger: 3,
    color: '#2d5a3d',
    glow: 'rgba(60, 120, 80, 0.55)',
    gradientFrom: '#2a4a35',
    gradientTo: '#142218',
    mapPath: 'M 660,175 C 700,155 760,165 800,205 C 825,245 800,285 745,295 C 690,285 655,240 660,175 Z',
    labelX: 735,
    labelY: 235,
    pinX: 748,
    pinY: 255,
  },
  {
    id: 'duskmire',
    name: 'Дускмір',
    stateType: 'Герцогство',
    capital: 'Нокталь',
    curse: 'Безсонна ніч',
    description: 'Землі вічної сутінки. Місяць не заходить — він дивиться.',
    extendedLore: 'Герцоги Ноктальїв зберегли кордон. Ціною сну всієї держави. Полудня тут не знають.',
    symbol: '◐',
    danger: 5,
    color: '#2a2045',
    glow: 'rgba(100, 80, 140, 0.6)',
    gradientFrom: '#352a55',
    gradientTo: '#151020',
    mapPath: 'M 745,295 C 800,305 845,290 870,330 C 885,375 850,410 790,400 C 740,385 715,340 745,295 Z',
    labelX: 810,
    labelY: 345,
    pinX: 818,
    pinY: 365,
  },
  {
    id: 'ironwraith',
    name: 'Айронврайт',
    stateType: 'Маркграфство',
    capital: 'Рунгард',
    curse: 'Ржава кров',
    description: 'Прикордонна марка мертвих лицарів. Варта не скінчилась — скінчилось лише життя.',
    extendedLore: 'Рунгард — руїна, навколо якої армія ходить колом сім століть. Без перемоги. Без кінця.',
    symbol: '⚔',
    danger: 4,
    color: '#4a3d4a',
    glow: 'rgba(160, 60, 70, 0.55)',
    gradientFrom: '#4a3540',
    gradientTo: '#1a1018',
    mapPath: 'M 790,400 C 835,420 855,455 835,495 C 800,525 740,510 710,470 C 695,435 730,405 790,400 Z',
    labelX: 770,
    labelY: 460,
    pinX: 778,
    pinY: 478,
  },
  {
    id: 'hollowspire',
    name: 'Шпилес',
    stateType: 'Вільна Держава',
    capital: 'Шпилес',
    curse: 'Ехо без голосу',
    description: 'Місто-держава біля Порожньої Вежі. Кожен поверх — чужа епоха.',
    extendedLore: 'Немає короля — є Рада Башти. Торгові шляхи ведуть сюди. Звідси — не повертаються.',
    symbol: '▲',
    danger: 5,
    color: '#352a4d',
    glow: 'rgba(120, 90, 180, 0.6)',
    gradientFrom: '#3d2e58',
    gradientTo: '#181220',
    mapPath: 'M 530,380 C 575,365 625,375 650,415 C 640,465 575,485 520,465 C 485,435 495,400 530,380 Z',
    labelX: 575,
    labelY: 420,
    pinX: 580,
    pinY: 440,
  },
  {
    id: 'nightfen',
    name: 'Найтфен',
    stateType: 'Королівство',
    capital: 'Мірехольд',
    curse: 'Туман забуття',
    description: 'Королівство туману на заході. Воно забирає дні — не лише видимість.',
    extendedLore: 'Мірехольд плаває на воді. Вулиці зміщуються за ніч. Єдиний сухий документ — родовід Фенмарів.',
    symbol: '≋',
    danger: 3,
    color: '#1e3348',
    glow: 'rgba(50, 90, 130, 0.55)',
    gradientFrom: '#243a50',
    gradientTo: '#0e1820',
    mapPath: 'M 370,310 C 420,290 470,315 465,370 C 450,415 385,420 345,385 C 325,350 340,325 370,310 Z',
    labelX: 400,
    labelY: 355,
    pinX: 408,
    pinY: 372,
  },
  {
    id: 'grimhold',
    name: 'Грімхольд',
    stateType: 'Твердиня-Держава',
    capital: 'Грімхольд',
    curse: 'Печать вічності',
    description: 'Остання твердиня імперії. Король замурований. Сім печаток тримають завісу.',
    extendedLore: 'Фортеця, що стала державою. Семеро Вартових правлять за відсутнього короля. Шість печаток тріснули.',
    symbol: '⬡',
    danger: 5,
    color: '#1a1018',
    glow: 'rgba(201, 162, 39, 0.5)',
    gradientFrom: '#2a1820',
    gradientTo: '#0a0608',
    mapPath: 'M 280,175 C 325,160 355,200 350,260 C 330,310 275,305 245,260 C 225,220 245,190 280,175 Z',
    labelX: 295,
    labelY: 235,
    pinX: 300,
    pinY: 255,
  },
]

export const empireCenter = {
  id: 'ethelmourn',
  name: 'Етельморн',
  description: 'Мертве серце імперії. Тут завіса найтонша — і пам\'ять найгучніша.',
  extendedLore: 'Колись — столиця світу. Тепер — порожнеча, з якої ростуть сім держав. Кожна тягне клочок колишньої слави.',
  labelX: 520,
  labelY: 300,
  pinX: 520,
  pinY: 310,
  mapPath: 'M 455,255 C 490,230 545,235 575,275 C 585,320 545,355 495,350 C 450,340 430,295 455,255 Z',
}

export const continentCoast =
  'M 240,220 C 260,160 340,80 480,55 C 620,40 750,80 820,160 C 870,230 880,320 860,400 C 830,490 740,540 620,530 C 500,520 400,500 320,460 C 250,410 220,340 230,270 C 235,240 240,220 240,220 Z'

export const tradeRoutes = [
  'M 300,255 L 408,372',
  'M 510,145 L 520,310',
  'M 520,310 L 580,440',
  'M 520,310 L 748,255',
  'M 748,255 L 818,365',
  'M 580,440 L 778,478',
  'M 408,372 L 580,440',
]