---
layout: section
transition: slide-up
level: 1
---

# Frontmatter

---
level: 2
---

# Frontmatter: базовый конфиг

Всё, что повторяется в каждой презентации

```yaml [slides.md]
---
theme: seriph                # тема
themeConfig:
  primary: '#069494'         # акцентный цвет
background: https://cover.sli.dev
title: Python практика 1
drawings:
  persist: false             # не хранить рисунки между слайдами
transition: slide-left       # переход по умолчанию
mdc: true                    # MDC-синтаксис
addons:
  - slidev-addon-python-runner
favicon: /python-icon.svg    # своя иконка вкладки
hideInToc: true
seoMeta:
  ogImage: https://cover.sli.dev
---
```

> Одинаковый шаблон у всех презов в репозитории. `themeConfig.primary` перекрашивает акценты темы `seriph`.

---
level: 2
---

# Frontmatter: background

Фон первого слайда берётся из `background: https://cover.sli.dev`

```yaml
background: https://cover.sli.dev
```

<center>
<img src="https://cover.sli.dev" style="width:60%; height:auto;" m-t="5">
</center>

> `cover.sli.dev` — генератор обложек Slidev. Применяется как фон на титульном слайде (в `preza-python-1`, `preza-descrete-1` и др.).

---
level: 2
---

# Frontmatter: favicon

Локальная иконка для вкладки браузера

<div grid="~ cols-2 gap-4">
<div>

```yaml
favicon: /python-icon.svg
```

Файл лежит в `public/` и подхватывается автоматически.

</div>

<center>
<div class="grid place-items-center h-full">
<img src="/python-icon.svg" style="width:40%; height:auto;">
</div>
</center>
</div>

> `/python-icon.svg` — иконка Python во всех презах. Для Clash использовали удалённую: `favicon: https://clash-lang.org/media/logos/icon_dark.svg`.

---
level: 2
---


# Per-slide frontmatter

Локальный `layout`, `level`, `transition` на конкретном слайде

```md
---
level: 2
transition: slide-up
---

# Практика
```

```md
---
layout: full
---

# Содержание
<Toc columns="1" maxDepth="2"/>
```

> Уровень `level: N` группирует заголовки в `<Toc>`. Использовано в `preza-python-2`, `preza-python-3` для иерархии практик.
