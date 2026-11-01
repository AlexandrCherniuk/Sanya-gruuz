// Тексты формы заявки по языкам. Отдельно от content.ts, чтобы команда текстов
// и команда заявок не ловили конфликты.
const ua = {
  title: 'Розрахувати вартість',
  lead: 'Логіст передзвонить, підбере машину і назве ціну.',
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
  submit: 'Отримати розрахунок',
  sending: 'Надсилаємо…',
  privacy: 'Без спаму: номер потрібен лише для розрахунку.',
  successTitle: 'Заявку отримали',
  successText: 'Логіст передзвонить з розрахунком. Терміново? Зателефонуйте.',
  call: 'Зателефонувати',
  again: 'Ще одна заявка',
  errorPhone: 'Вкажіть номер телефону.',
  errorFrom: 'Вкажіть, звідки везти.',
  errorTo: 'Вкажіть, куди везти.',
  errorSend: 'Не вдалося надіслати заявку. Зателефонуйте нам, будь ласка.',
}

export type FormCopy = typeof ua

const ru: FormCopy = {
  title: 'Рассчитать стоимость',
  lead: 'Логист перезвонит, подберёт машину и назовёт цену.',
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
  submit: 'Получить расчёт',
  sending: 'Отправляем…',
  privacy: 'Без спама: номер нужен только для расчёта.',
  successTitle: 'Заявку получили',
  successText: 'Логист перезвонит с расчётом. Срочно? Позвоните.',
  call: 'Позвонить',
  again: 'Ещё одна заявка',
  errorPhone: 'Укажите номер телефона.',
  errorFrom: 'Укажите, откуда везти.',
  errorTo: 'Укажите, куда везти.',
  errorSend: 'Не удалось отправить заявку. Позвоните нам, пожалуйста.',
}

export type FormLang = 'ua' | 'ru'

export const formCopy: Record<FormLang, FormCopy> = { ua, ru }
