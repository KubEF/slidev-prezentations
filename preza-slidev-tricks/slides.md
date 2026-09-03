---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Slidev-фишки и хаки
info: |
  ## Референсная презентация со всеми наработками
drawings:
  persist: false
transition: slide-left
mdc: true
seoMeta:
  ogImage: https://cover.sli.dev
fonts:
  sans: Robot
  mono: JetBrains Mono
addons:
  - slidev-addon-python-runner
favicon: /python-icon.svg
hideInToc: true
python:
  suppressDeprecationWarnings: true
---

# Slidev-фишки и хаки

---
hideInToc: true
---

# Содержание

<div>
<Toc columns="1" maxDepth="1"/>
</div>

---

# Общая информация
<br>

Референсная презентация: все наработки из `preza-python-*`, `preza-descrete-1`, `preza-clash` в одном файле

<br>

- Живой пример + подпись, где фишка уже применялась
- Запуск: `npm run dev -- preza-slidev-tricks`
- Сборка: `npm run build -- preza-slidev-tricks`
- Экспорт: `npm run export -- preza-slidev-tricks`

---
src: ./sections/frontmatter.md
---

---
src: ./sections/layouts.md
---

---
src: ./sections/animations.md
---

---
src: ./sections/codeblocks.md
---

---
src: ./sections/components.md
---

---
src: ./sections/math-styles.md
---

---
src: ./sections/multimedia.md
---

---
src: ./sections/infrastructure.md
---

---
src: ./sections/summary.md
---
