---
layout: section
transition: slide-up
level: 1
---

# Анимации и клики

---
level: 2
---

# v-click и v-clicks

Появление по кликам

<v-clicks>

- `v-click` — элемент появляется по клику
- `v-clicks` — оборачивает группу, появление по одному
- `v-click at="3"` — появиться с третьего клика
- `v-clicks at="1"` — начать показ с первого

</v-clicks>

<v-click at="3">

### Появилось с третьего клика

</v-click>

> `preza-descrete-1`: определения множеств раскрываются по одному: `<v-click at="2"> = {...}</v-click>`.

---
level: 2
---

# v-switch

Переключение контента по кликам (без «роста» слайда)

<v-switch>

<template #0>

### Вариант 0

- Контент полностью заменяется, а не добавляется
- Идеально для «шагов» с большим кодом

```python
>>> 5 / 2
2.5
```

</template>

<template #1>

### Вариант 1

- Как табы: только один шаблон виден в момент
- Номер шаблона — `#0`, `#1`, `#2`, ...

```python
>>> 5 // 2
2
```

</template>

</v-switch>

> Главная фишка `preza-python-1` (типы данных, циклы) и `preza-python-2` (шаги git). Внутри шаблонов спокойно живут гриды и код.

---
level: 2
---

# v-mark: подсветка

Выделение слов по клику

<br>

- <span v-mark.highlight.red="2">Выделить слово</span> красным
- <span v-mark.red>Просто подчеркнуть</span> с первого клика
- Синтаксис: `v-mark.highlight.<color>="<step>"` или `v-mark.<color>`
- Цвета: `red`, `orange`, `green`, `teal`, `blue`, `purple`, ...

<v-click>

- Цифра в кавычках — номер клика, с которого подсвечивается

</v-click>

> `preza-python-1` «Привить инженерную культуру», `preza-descrete-1` «Лексикографический порядок», `preza-python-7` «Функции».

---
level: 2
---

# Переходы: transition

Анимация смены слайдов

```yaml
transition: slide-left      # глобально, в frontmatter
```
```md
---
transition: slide-up        # локально, на слайде
---
```

- `slide-left`, `slide-up`, `slide-down`, `slide-right`, `fade`, `fade-out`, `zoom`, `none`
- У всех презов `slide-left` глобально, в разделах `slide-up`

> `preza-python-10` переключает секции через `transition: slide-up`. Глобальный `transition: slide-left` — стандарт репозитория.
