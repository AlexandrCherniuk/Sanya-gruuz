// Пишет готовый HTML для каждой страницы в dist/<язык>/<путь>/index.html.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const manifest = JSON.parse(await fs.readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
const entry = manifest['src/client.tsx']
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const base = ssr.BASE ?? '/'
const assets = {
  js: base + entry.file,
  css: (entry.css ?? []).map((f) => base + f),
}

async function write(rel, html) {
  const file = path.join(dist, rel)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, html)
}

for (const route of ssr.routes) {
  await write(path.join(route.lang, route.path, 'index.html'), ssr.renderPage(route, assets))
}
await write('index.html', ssr.renderRoot())
await write('404.html', ssr.render404(assets))
await write('sitemap.xml', ssr.renderSitemap())
await write('robots.txt', ssr.renderRobots())
await fs.rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${ssr.routes.length} pages`)
