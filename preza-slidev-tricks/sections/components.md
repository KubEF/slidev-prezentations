---
layout: section
transition: slide-up
level: 1
---

# Компоненты

---
level: 2
---

# SlidevVideo

Видео в слайде, управляемое кликами

<div grid="~ cols-2 gap-4">
<div>

- `<SlidevVideo>` — обёртка Slidev над `<video>`
- `v-click` — видео появляется по клику
- `autoplay controls` — автостарт + управление
- `autoreset='click'` — перезапуск при возврате на слайд

</div>

<div>
<SlidevVideo v-click autoplay controls autoreset='click'>
  <source src="/dfs-animation.mp4" type="video/mp4" />
</SlidevVideo>
</div>

</div>

> `preza-python-11`: обход графа в глубину — анимация Manim, рендер в mp4, вставка через `<SlidevVideo>`.

---
level: 2
---

# SlidevVideo: вариант без клика

Появление вместе со слайдом

<SlidevVideo autoplay controls loop>
  <source src="/CompactDFS.mp4" type="video/mp4" />
</SlidevVideo>

<center>

Компактная версия DFS-анимации (`CompactDFS.mp4` в `public/`).

</center>

> Тот же компонент без `v-click` — видео сразу на слайде, `loop` зацикливает.

---
level: 2
---

# Toc: автоматическое содержание

```
<Toc columns="1" maxDepth="1"/>
```

- Строит содержание из заголовков слайдов
- `maxDepth` — насколько глубоко брать заголовки
- `columns` — число колонок

<br>

<div>
<Toc columns="2" maxDepth="1"/>
</div>

> `preza-python-2` «Содержание». Иерархия задаётся `level: N` в frontmatter слайдов.

---
level: 2
---

# Навигация: `$slidev.nav`

Кнопки перехода с клавиатурой и без

<div grid="~ cols-2 gap-4">
<div>

```html
<button @click="$slidev.nav.go(2)"
        class="slidev-icon-btn">
  <carbon:arrow-right />
</button>
```

- `$slidev.nav.go(n)` — перейти на слайд
- `$slidev.nav.next` / `prev` — следующий/предыдущий
- `$slidev.nav.openInEditor()` — открыть в редакторе

</div>

<center>
<div class="grid place-items-center h-full">

<button @click="$slidev.nav.go(6)" class="slidev-icon-btn">
  <carbon:arrow-right class="text-3xl"/>
</button>
<p>Прыжок на слайд 6</p>

</div>
</center>
</div>

> `preza-python-1`: кнопка «Пропустить базу» прыгает на слайд 15.

---
level: 2
---

# Счётчик слайдов: SlideCurrentNo / SlidesTotal

```
<SlideCurrentNo />/<SlidesTotal />
```

- `<SlideCurrentNo />` — текущий номер
- `<SlidesTotal />` — всего слайдов
- Живут в `addons/shared/global-bottom.vue` → видны на каждом слайде (низ, справа)

<center>
<div class="grid place-items-center h-full text-5xl text-gray">
<SlideCurrentNo />/<SlidesTotal />
</div>
</center>

> Общий аддон репозитория `slidev-addon-shared` — подключается автоматически через `slidev.addons` в корневом `package.json`.
