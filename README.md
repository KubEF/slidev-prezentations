# Slidev-презентации

Коллекция презентаций на [Slidev](https://sli.dev/), собранных в одном npm workspace.

## Структура

```
├── package.json          # общие зависимости (workspace)
├── shared/               # общие конфиги (симлинки из презентаций)
│   ├── global-bottom.vue
│   ├── uno.config.ts
│   └── setup/shiki.ts
├── index.html            # главная страница со списком презентаций
├── preza-python-*/       # презентации по Python
├── preza-descrete-1/     # презентация по дискретной математике
└── preza-clash/          # презентация про Clash
```

## Установка

```bash
npm install
```

Все зависимости устанавливаются один раз в корневой `node_modules` и
доступны всем презентациям (npm workspaces).

## Запуск

```bash
npm run dev --workspace=preza-python-1
# или перейти в директорию
cd preza-python-1 && npm run dev
```

Доступные скрипты в каждой презентации:

- `npm run dev` — запустить dev-сервер
- `npm run build` — собрать в `dist/`
- `npm run build_gh_pages` — собрать с base-путём для GitHub Pages
- `npm run export` — экспортировать в PDF

## Деплой

[.github/workflows/deploy.yaml](.github/workflows/deploy.yaml) собирает все
презентации и публикует их на GitHub Pages (главная страница — `index.html`).
