# Где живёт сайт и как его выкладывать

Код один (ветка `main`), копий сайта две:

- **GitHub Pages**: https://alexandrcherniuk.github.io/Sanya-gruuz/. Собирает GitHub Actions
  (`.github/workflows/pages.yml`) на каждый пуш в `main`. Пока главный адрес.
- **Cloudflare Pages**: Cloudflare сам забирает `main` из GitHub и собирает. Временный адрес
  `<проект>.pages.dev`, потом свой домен.

Главный адрес сайта задан в `src/site/config.ts` (`DEFAULT_SITE_URL`). На него ведут canonical,
hreflang, og и карта сайта с любой копии, так что поиск не видит дублей. Временный `*.pages.dev`
дополнительно закрыт от поиска в `public/_headers`.

Переменные сборки не нужны: адрес скрипта заявок вшит в `src/lead.ts`. Тег Google Ads включается
переменными `VITE_GADS_ID` и `VITE_GADS_LEAD_LABEL`; сейчас они пустые. Если включаем тег, задаём их
в обоих местах: в GitHub (Variables `GADS_ID`, `GADS_LEAD_LABEL`) и в Cloudflare (настройки проекта →
переменные, имена с `VITE_`).

## Подключить Cloudflare Pages (один раз, минут 10)

1. Зарегистрироваться на https://dash.cloudflare.com и включить двухфакторный вход.
2. **Workers & Pages → Create application → Pages → Connect to Git**.
3. GitHub → **Install & Authorize**. Доступ лучше дать только репозиторию `Sanya-gruuz`.
   Выбрать его → **Begin setup**.
4. Настройки сборки:
   - Project name: `gr-logistics` (адрес будет `gr-logistics.pages.dev`; если имя занято, Cloudflare
     допишет хвост);
   - Production branch: `main`;
   - Framework preset: `None`;
   - Build command: `npm run build`;
   - Build output directory: `dist`;
   - переменные окружения не нужны.
5. **Save and Deploy**. Сборка идёт пару минут.
6. В настройках проекта (раздел про сборку):
   - **Branch control** → Preview branch: `None`. Иначе каждая ветка PR тоже собирается и тратит
     лимит 500 сборок в месяц;
   - **Build watch paths**: Include `*`, Exclude `telegram-bot/*`, чтобы правки бота не пересобирали сайт.

## Свой домен

1. Домен должен быть в DNS Cloudflare. Куплен в Cloudflare: уже там. Куплен у другого регистратора:
   **Add a domain** → бесплатный план → у регистратора поменять NS на те два, что покажет Cloudflare.
2. Проект Pages → **Custom domains → Set up a domain** → `домен` → **Continue** → подтвердить.
   Потом так же `www.домен`. Сначала домен в Pages, DNS-записи Cloudflare создаст сам: если завести
   CNAME вручную раньше, будет ошибка 522. SSL выпускается сам.
3. В `src/site/config.ts` поменять `DEFAULT_SITE_URL` на `https://домен` (через PR).
4. Ссылки в объявлениях Google Ads перевести на новый домен и дождаться одобрения (обычно до
   1 рабочего дня).
5. Только после этого включить переадресацию со старого адреса github.io на домен. Раньше нельзя:
   Google отклоняет объявления, ссылка которых переадресует на другой домен.

## Если GitHub лежит

Сайт можно выложить в Cloudflare с компьютера, где есть Node 22 и этот репозиторий:

```
npm ci
npm run build
npx wrangler pages deploy dist --project-name=gr-logistics --branch=main
```

В первый раз wrangler откроет браузер, чтобы войти в Cloudflare.
