import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Car,
  Check,
  Clock,
  Construction,
  Droplets,
  FileText,
  Forklift,
  Globe2,
  Mountain,
  Route,
  Snowflake,
  Sofa,
  Truck,
  Container,
  Package,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '../content/types'

const map: Record<IconName, LucideIcon> = {
  bus: Package,
  van: Package,
  truck: Truck,
  trailer: Container,
  oversized: Construction,
  liquid: Droplets,
  reefer: Snowflake,
  bulk: Mountain,
  moving: Sofa,
  equipment: Boxes,
  car: Car,
  manipulator: Forklift,
  crane: Construction,
  groupage: Boxes,
  europe: Globe2,
  world: Globe2,
  route: Route,
  docs: FileText,
  business: Building2,
  clock: Clock,
  check: BadgeCheck,
}

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const C = map[name]
  return <C size={size} strokeWidth={1.8} aria-hidden="true" />
}

export function Arrow({ size = 18 }: { size?: number }) {
  return <ArrowRight size={size} strokeWidth={2.2} aria-hidden="true" />
}

export function Tick() {
  return <Check size={18} strokeWidth={2.6} aria-hidden="true" />
}

/** Иконки мессенджеров: простые узнаваемые знаки без брендовых логотипов. */
export function MessengerGlyph({ kind }: { kind: 'phone' | 'viber' | 'telegram' | 'whatsapp' | 'email' }) {
  const paths: Record<typeof kind, string> = {
    phone:
      'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z',
    viber:
      'M12 2C6.9 2 3.5 4.6 3.5 10.2c0 3 1 5 2.8 6.2V21l3.4-3.2c.75.12 1.5.2 2.3.2 5.1 0 8.5-2.6 8.5-7.8S17.1 2 12 2zm3.7 11.6-.9.9c-.6.6-2.3-.2-3.9-1.8S8.6 9.4 9.2 8.8l.9-.9c.3-.3.8-.3 1.1 0l.9.9c.3.3.3.8 0 1.1l-.4.4c.4.8 1 1.4 1.8 1.8l.4-.4c.3-.3.8-.3 1.1 0l.9.9c.2.2.2.7-.2 1z',
    telegram: 'M21.5 3.5 2.8 10.7c-1 .4-1 1.5 0 1.8l4.7 1.5 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.4 5 3.7c.6.4 1.4.1 1.6-.6L23 4.8c.2-.9-.7-1.6-1.5-1.3zM9.6 14.3l-.4 4-1.5-4.8 10.9-7z',
    whatsapp:
      'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z',
    email: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.2 7v10h15.6V7z',
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d={paths[kind]} />
    </svg>
  )
}
