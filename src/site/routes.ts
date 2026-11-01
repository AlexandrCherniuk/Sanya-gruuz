import { languages, type Lang } from './config'
import type { HubPage, LangContent, Meta, ServicePage } from '../content/types'
import { ua } from '../content/ua'
import { ru } from '../content/ru'

/** Контент по языкам. Новый язык: добавить файл src/content/<код>.ts и включить ready в config. */
export const content: Partial<Record<Lang, LangContent>> = { ua, ru }

type Base = { lang: Lang; path: string; meta: Meta; noindex?: boolean }

export type Route =
  | (Base & { kind: 'home' })
  | (Base & { kind: 'hub'; hub: HubPage })
  | (Base & { kind: 'service'; service: ServicePage })
  | (Base & { kind: 'prices' })
  | (Base & { kind: 'contacts' })
  | (Base & { kind: 'thanks' })

export const servicePath = (s: Pick<ServicePage, 'group' | 'slug'>) => `${s.group}/${s.slug}/`

export function buildRoutes(): Route[] {
  const routes: Route[] = []
  for (const l of languages) {
    const c = content[l.code]
    if (!l.ready || !c) continue
    const lang = l.code
    routes.push({ kind: 'home', lang, path: '', meta: c.home.meta })
    for (const hub of c.hubs) routes.push({ kind: 'hub', lang, path: `${hub.slug}/`, meta: hub.meta, hub })
    for (const s of c.services) routes.push({ kind: 'service', lang, path: servicePath(s), meta: s.meta, service: s })
    routes.push({ kind: 'prices', lang, path: 'prices/', meta: c.pricesPage.meta })
    routes.push({ kind: 'contacts', lang, path: 'contacts/', meta: c.contactsPage.meta })
    routes.push({ kind: 'thanks', lang, path: 'thanks/', meta: c.thanksPage.meta, noindex: true })
  }
  return routes
}

/** На каких языках существует тот же путь (для hreflang и переключателя). */
export function langsForPath(path: string, routes: Route[]) {
  return routes.filter((r) => r.path === path).map((r) => r.lang)
}
