// Тексты формы заявки по языкам. Отдельно от content.ts, чтобы команда текстов
// и команда заявок не ловили конфликты.
const ua = {
  title: 'Дізнатися ціну',
  lead: 'Розрахуємо вартість за 15 хвилин після заявки.',
  phone: 'Телефон',
  phonePlaceholder: '+38 0__ ___ __ __',
  from: 'Звідки',
  fromPlaceholder: 'Київ',
  to: 'Куди',
  toPlaceholder: 'Варшава',
  detailsToggle: 'Додати деталі',
  cargo: 'Що веземо',
  cargoPlaceholder: 'Меблі, палети, техніка…',
  name: "Ваше ім'я",
  namePlaceholder: 'Олександр',
  date: 'Коли',
  submit: 'Отримати ціну →',
  sending: 'Надсилаємо…',
  privacy: 'Дані лише для розрахунку перевезення.',
  successTitle: 'Заявку отримали',
  successText: 'Скоро передзвонимо з розрахунком. Терміново? Зателефонуйте.',
  call: 'Зателефонувати',
  again: 'Ще одна заявка',
  errorPhone: 'Вкажіть номер телефону.',
  errorFrom: 'Вкажіть, звідки везти.',
  errorTo: 'Вкажіть, куди везти.',
  errorSend: 'Не вдалося надіслати заявку. Зателефонуйте нам, будь ласка.',
}

export type FormCopy = typeof ua

const ru: FormCopy = {
  title: 'Узнать цену',
  lead: 'Рассчитаем стоимость за 15 минут после заявки.',
  phone: 'Телефон',
  phonePlaceholder: '+38 0__ ___ __ __',
  from: 'Откуда',
  fromPlaceholder: 'Киев',
  to: 'Куда',
  toPlaceholder: 'Варшава',
  detailsToggle: 'Добавить детали',
  cargo: 'Что везём',
  cargoPlaceholder: 'Мебель, паллеты, техника…',
  name: 'Ваше имя',
  namePlaceholder: 'Александр',
  date: 'Когда',
  submit: 'Получить цену →',
  sending: 'Отправляем…',
  privacy: 'Данные только для расчёта перевозки.',
  successTitle: 'Заявку получили',
  successText: 'Скоро перезвоним с расчётом. Срочно? Позвоните.',
  call: 'Позвонить',
  again: 'Ещё одна заявка',
  errorPhone: 'Укажите номер телефона.',
  errorFrom: 'Укажите, откуда везти.',
  errorTo: 'Укажите, куда везти.',
  errorSend: 'Не удалось отправить заявку. Позвоните нам, пожалуйста.',
}

export type FormLang = 'ua' | 'ru'

export const formCopy: Record<FormLang, FormCopy> = { ua, ru }
