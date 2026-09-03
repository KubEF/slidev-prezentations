---
layout: section
transition: slide-up
level: 1
---

# Инфраструктура репозитория

---
level: 2
---

# Общий аддон: slidev-addon-shared

`addons/shared/` — применяется ко всем презентациям

```
addons/shared/
├── package.json          # name: slidev-addon-shared
├── global-bottom.vue     # счётчик слайдов
├── uno.config.ts         # safelist иконок
└── setup/shiki.ts        # темы подсветки
```

Подключение — в корневом `package.json`:

```json [package.json]
"slidev": {
  "addons": ["slidev-addon-shared"]
}
```

> Один общий конфиг вместо дублирования в каждой презе. Локальный аддон ставится как `file:./addons/shared`.

---
level: 2
---

# global-bottom.vue: счётчик на всех слайдах

```vue [global-bottom.vue]
<template>
  <div class="abs-br m-1 text-xl" color="gray">
  <SlideCurrentNo />/<SlidesTotal />
</div>
</template>
```

- Файл `global-bottom.vue` в корне аддона → рендерится на каждом слайде
- `abs-br` — absolute bottom-right (UnoCSS)
- Видите его сейчас внизу справа

> Фишка из этого аддона — на каждом слайде всех презентаций.

---
level: 2
---

# setup/shiki.ts: темы подсветки

```ts [setup/shiki.ts]
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'catppuccin-mocha',
      light: 'catppuccin-latte',
    },
  }
})
```

- Переопределяет темы Shiki для подсветки кода
- Тёмная и светлая — в зависимости от темы слайдов
- Лежит в `addons/shared/setup/`

> Catppuccin Mocha/Latte — выбор подсветки всего репозитория.

---
level: 2
---

# uno.config.ts: safelist иконок

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  safelist: [
    'i-logos:microsoft-windows-icon',
    'i-logos:ubuntu',
    'i-logos:archlinux',
    'i-logos:linux-tux'
  ],
})
```

- Иконки в code-group (`~i-logos:ubuntu~`) иконка загружается динамически
- Без safelist они могут не попасть в продакшен-сборку
- `@iconify-json/logos` — devDependency в корне

> Пригодилось для `preza-python-2` (вкладки установки git).

---
level: 2
---

# vite.config.js: base-путь для GitHub Pages

```js [preza-slidev-tricks/vite.config.js]
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/slidev-prezentations/preza-slidev-tricks/',
})
```

- Каждая преза лежит по своему подпути на Pages
- `base` должен совпадать с URL раздела
- Без этого ассеты собираются в корень и ломаются

> Одинаковый `vite.config.js` во всех презах, отличается только base.

---
level: 2
---

# Скрипты: dev / build / export

`scripts/run.mjs` — обёртка над `npx slidev`

```js [scripts/run.mjs]
const [mode, entry] = process.argv.slice(2)
const target = entry.endsWith('.md') ? entry : `${entry}/slides.md`

const args = []
if (mode === 'dev') args.push('--open')
else args.push(mode)
args.push(target)
if (mode === 'export') args.push('--with-clicks')
```

```bash
npm run dev -- preza-python-1
npm run build -- preza-python-1
npm run export -- preza-python-1
```

> `--with-clicks` в export — чтобы в PDF были ВСЕ клики развёрнуты.

---
level: 2
---

# Скрипты: массовая сборка и экспорт

`scripts/build-gh.mjs` + `export.sh`

```js [scripts/build-gh.mjs]
const dirs = readdirSync('.').filter(
  (d) => d.startsWith('preza-') && !d.startsWith('.')
)
for (const dir of dirs) {
  await run('npx', ['slidev', 'build', join(dir, 'slides.md')])
}
```

```bash [export.sh]
for dir in preza-python-*/; do
  npm run export --with-clicks
  mv slides-export.pdf python-${number}.pdf
done
```

> `npm run build_gh_pages` собирает всё. `export.sh` переименовывает PDF по номеру (`python-12.pdf`).

---
level: 2
---

# CI/CD: GitHub Actions → Pages

`.github/workflows/deploy.yaml`

```yaml
- name: Install and build all presentations
  run: |
    DIRS=$(find . -maxdepth 2 -name "slides.md" -exec dirname {} \;)
    for RAW_DIR in $(echo $DIRS); do
      DIR=${RAW_DIR#./}
      npx slidev build "$DIR/slides.md"
      mkdir -p "dist/$DIR"
      cp -r "$DIR/dist/"* "dist/$DIR/"
    done
- name: Copy main page to dist
  run: |
    cp index.html dist/
    cp style.css dist/
```

- Находит все `slides.md`, собирает, складывает в `dist/<преза>/`
- Главная страница (`index.html`) копируется в корень `dist/`
- Деплой — `actions/configure-pages` + `upload-pages-artifact` + `deploy-pages`

> Автоматически пересобирает весь репозиторий при пуше в `main`.

---
level: 2
---

# Главная страница: index.html

Простой HTML-список ссылок на презентации

```html
<details class="topic">
  <summary class="topic-header"><h2>Презентации по питону</h2></summary>
  <div class="presentations-list">
    <a href="/slidev-prezentations/preza-python-1/" class="presentation-link">
      <span class="presentation-icon">1</span>
      <div class="presentation-info">
        <h3>Основы Python</h3>
        <p>Синтаксис, типы данных, основные конструкции</p>
      </div>
      <span class="presentation-arrow">→</span>
    </a>
  </div>
</details>
```

- `<details>`/`<summary>` — раскрывающиеся темы
- Стили — `style.css`
- Ссылки ведут на `/<repo>/<преза>/` (совпадает с `base` в vite.config.js)

> Живой пример — корневой `index.html` этого репозитория.

---
level: 2
---

# Прочее из конфигов

Файлы-помощники

`.markdownlint.json` (в презах с проверкой):

```json [.markdownlint.json]
{
  "MD033": false,   /* инлайн-HTML */
  "MD025": false,   /* несколько h1 */
  "MD034": false,   /* голые URL */
  "MD013": false,   /* длинные строки */
  "MD022": false    /* пустые строки вокруг заголовков */
}
```

`.npmrc` (для pnpm/workspaces):

```ini [.npmrc]
shamefully-hoist=true
auto-install-peers=true
```

> `.markdownlint.json` — чтобы линтер не ругался на слайд-специфику. `.npmrc` — для hoisting-пакетов в общий `node_modules`.
