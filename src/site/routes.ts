import { languages, type Lang } from './config'
import type { HubPage, LangContent, Meta, ServicePage, SimplePage } from '../content/types'
import { ua } from '../content/ua'
import { ru } from '../content/ru'

/** Контент по языкам. Новый язык: добавить файл src/content/<код>.ts и включить ready в config. */
export const content: Partial<Record<Lang, LangContent>> = { ua, ru }

export type Route =
  | { kind: 'home'; lang: Lang; path: ''; meta: Meta; noindex?: boolean }
  | { kind: 'hub'; lang: Lang; path: string; meta: Meta; hub: HubPage; noindex?: boolean }
  | { kind: 'service'; lang: Lang; path: string; meta: Meta; service: ServicePage; noindex?: boolean }
  | { kind: 'page'; lang: Lang; path: string; meta: Meta; page: SimplePage; noindex?: boolean }

export const servicePath = (s: Pick<ServicePage, 'group' | 'slug'>) => `${s.group}/${s.slug}/`

export function buildRoutes(): Route[] {
  const routes: Route[] = []
  for (const l of languages) {
    const c = content[l.code]
    if (!l.ready || !c) continue
    routes.push({ kind: 'home', lang: l.code, path: '', meta: c.home.meta })
    for (const hub of c.hubs) routes.push({ kind: 'hub', lang: l.code, path: `${hub.slug}/`, meta: hub.meta, hub })
    for (const s of c.services) routes.push({ kind: 'service', lang: l.code, path: servicePath(s), meta: s.meta, service: s })
    for (const page of Object.values(c.pages)) {
      routes.push({ kind: 'page', lang: l.code, path: `${page.slug}/`, meta: page.meta, page, noindex: page.noindex })
    }
  }
  return routes
}

/** На каких языках существует тот же путь (для hreflang и переключателя). */
export function langsForPath(path: string, routes: Route[]) {
  return routes.filter((r) => r.path === path).map((r) => r.lang)
}
