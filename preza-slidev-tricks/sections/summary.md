---
layout: section
transition: slide-up
level: 1
---

# Итог

---
level: 2
---

# Что внутри

Все фишки репозитория в одном месте

- **Frontmatter** — theme, background, transition, mdc, fonts, favicon, addons, hideInToc
- **Layouts** — full, section, image-right, image, two-cols-header, гриды, `<center>`
- **Анимации** — v-click/clicks/switch, v-mark, magic-move, transitions
- **Код-блоки** — подсветка строк, именованные блоки, code-group, `<<<`, magic-move
- **Компоненты** — SlidevVideo, Toc, SlideCurrentNo/SlidesTotal, $slidev.nav
- **Мультимедиа** — python-runner (Pyodide), Manim → mp4, SVG-схемы
- **Инфраструктура** — общий аддон, vite.config base, скрипты, CI/CD, index.html

<v-click>

### Рецепт новой презентации

- Скопируй `preza-blank/`
- Поменяй путь в `vite.config.js`
- Пиши новую презентацию в `slides.md`

</v-click>

---
level: 2
---

# Итог

<br>

Собери всё сам:

```bash
npm run dev -- preza-slidev-tricks
npm run build -- preza-slidev-tricks
npm run export -- preza-slidev-tricks
```

<br>

Доки Slidev: [sli.dev](https://sli.dev)
