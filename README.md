# Slidev-презентации

Коллекция презентаций на [Slidev](https://sli.dev/) в одном репозитории.

## Структура

```
├── package.json          # все зависимости + конфиг аддона
├── addons/shared/        # локальный slidev-аддон с общими конфигами
│   ├── package.json
│   ├── global-bottom.vue # счётчик слайдов N/M
│   ├── uno.config.ts     # safelist иконок
│   └── setup/shiki.ts    # темы подсветки синтаксиса
├── scripts/build-gh.mjs  # сборка всех презентаций
├── index.html            # главная страница со списком презентаций
├── preza-python-*/       # презентации по Python
├── preza-descrete-1/     # презентация по дискретной математике
└── preza-clash/          # презентация про Clash
```

Каждая презентация — это только контент: `slides.md`, `public/`, картинки и
`vite.config.js` (base-путь для GitHub Pages). Зависимостей в презентациях
нет — всё ставится один раз в корневой `node_modules`.

## Установка

```bash
npm install
```

Локальный аддон `slidev-addon-shared` подключается автоматически через
поле `slidev.addons` в корневом `package.json` и применяется ко всем
презентациям.

## Запуск

```bash
npm run dev -- preza-python-1        # dev-сервер
npm run build -- preza-python-1      # сборка в preza-python-1/dist/
npm run build_gh_pages               # собрать все презентации
npm run export -- preza-python-1     # экспорт в PDF
```

`npm run ... -- <директория>` передаёт путь в slidev.

## Деплой

[.github/workflows/deploy.yaml](.github/workflows/deploy.yaml) ставит
зависимости (`npm ci`), собирает все презентации через `npx slidev build
<dir>/slides.md` и публикует их на GitHub Pages (главная страница —
`index.html`).
