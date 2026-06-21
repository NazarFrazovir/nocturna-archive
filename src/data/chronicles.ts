export interface Chronicle {
  id: string
  year: string
  title: string
  description: string
}

export const chronicles: Chronicle[] = [
  {
    id: 'first-seal',
    year: '0 Е.З.',
    title: 'Перша Печать',
    description: 'Імператор запечатав ворота. Сім держав стали сімома печатками. Світ забув їхні імена.',
  },
  {
    id: 'eclipse-war',
    year: '312 Е.З.',
    title: 'Останнє Затемнення',
    description: 'Сім днів без неба. Світло повернулось — половини імперії вже не було.',
  },
  {
    id: 'inkkeepers',
    year: '401 Е.З.',
    title: 'Орден',
    description: 'Тринадцять вчених поклялися: нічого не буде стерто вдруге. Так з’явився Архів.',
  },
  {
    id: 'crown-lost',
    year: '518 Е.З.',
    title: 'Загублена Корона',
    description: 'Корона зникла з тронної зали. Десять літ пошуків — нуль слідів. Лише напис на стіні.',
  },
  {
    id: 'hollow-breach',
    year: '623 Е.З.',
    title: 'Пролом',
    description: 'Вежа в Шпилесі тріснула. Туман виплив — три села зникли з мапи, не з хронік.',
  },
  {
    id: 'iron-march',
    year: '701 Е.З.',
    title: 'Залізний Поход',
    description: 'Мертві лицарі вийшли з Айронврайту. Не атакували — просто йшли на захід.',
  },
  {
    id: 'veil-thin',
    year: '844 Е.З.',
    title: 'Тонка Завіса',
    description: 'Завіса слабшає. Артефакти прокидаються. Чорнильники фіксують кожну дрож.',
  },
  {
    id: 'archive-opens',
    year: 'Сьогодні',
    title: 'Відкриття',
    description: 'Ти тут. Отже, завіса вже знає твоє ім’я.',
  },
]