---
# You can also start simply with 'default'
theme: seriph
themeConfig:
  primary: '#069494'
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Python практика 1
info: |
  ## Практика по Python 1
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
seoMeta:
  # By default, Slidev will use ./og-image.png if it exists,
  # or generate one from the first slide if not found.
  ogImage: https://cover.sli.dev
fonts:
  sans: Robot
  mono: JetBrains Mono
addons:
  - slidev-addon-python-runner
favicon: /python-icon.svg
---

# Практика по Python 1

<!-- <div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div> -->

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# Цели курса
Что мы хотим добиться

<v-clicks>

1. <span v-mark.highlight.red="4">Привить общую инженерную культуру</span>
    - Качество кода
    - Инструменты разработчика
2. Сформировать навыки алгоритмического мышления
3. Базово изучить Python
</v-clicks>

---

# История питона
<div> </div>
1991 — Публикация Гвидо Ван Россумом рабочей версии (0.9.0)

1994 — Версия 1.0: добавляются элементы функционального программирования, такие как функции `lambda`, `filter`, `map`, `reduce`

Во второй половине 90-х DARPA финансирует программу “Computer Programming for Everybody”, цель которой -- научить всех (непрограммистов) базовой “компьютерной грамотности”. Основой программы является Python

2000 — Версия 2.0

2001 — Основание Python Software Foundation

2008 — Версия 3.0 (одновременно с 2.6)

2020 — Последнее обновление Python 2.7

*2025*: актуальная версия Python 3.13.7 (все примеры будут на этой версии, если не сказано обратного)

---

# Python2 и Python3
Великий переход

3.12.2008 вышла первая версия Python3

- Устраняет многие недостатки архитектуры
- Упрощает синтаксис
- Создаёт проблемы из-за не полной совместимости с Python2

Где-то до сих пор можно встретить Python2

---

# <u>Динамический</u> интерпретируемый язык
По ходу дела разберёмся

Динамический == известно только на момент выполнения

<v-switch>

<template #1>

Интерпретатор не проверяет типы, получишь ошибку в runtime

```python {monaco-run}
def imposter():
  print(2 / "a")

print("This is fine!")
imposter()
```
</template>
<template #2>

Связывание имён происходит также во время выполнения

```python {monaco-run}
# никогда так не пишите!
def f():
  print(x)

# то, что ниже может быть вообще в другом модуле
x = 1

f()
```
</template>

</v-switch>
---

# Как запускать программы
<br>

## Интерактивная среда (REPL) Python

```console [bash]
[efim@kubef ~]$ python
Python 3.13.7 (main, Aug 15 2025, 12:34:02) [GCC 15.2.1 20250813] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> print("hello, world")
hello, world
>>> quit
[efim@kubef ~]$ 
```
<br>

## Выполнение из файла

<div grid="~ cols-2 gap-4">
<div>

```console [bash]
[efim@kubef ~]$ python test.py
hello, test
```
</div>
<div>

```python [test.py]{*}{lines:true}
print("hello, test")
```

</div>
</div>
