// Совместимость для формы заявки: контакты теперь живут в src/site/config.ts.
import { brand, contacts } from './site/config'

export const site = {
  name: brand.name,
  phone: `+${contacts.phone}`,
  phoneDisplay: contacts.phoneDisplay,
  email: contacts.email,
} as const
