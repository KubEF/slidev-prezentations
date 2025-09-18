---
# You can also start simply with 'default'
theme: seriph
themeConfig:
  primary: '#069494'
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://git-scm.com/images/branching-illustration@2x.png
# some information about your slides (markdown enabled)
title: Python практика 3
info: |
  ## Практика по Python 3
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
hideInToc: true
---

# Практика по Python 3
Ещё немножко про git и GitHub


---
layout: image-right
image: /branches.svg
backgroundSize: 80%
---

# Ветки

<v-switch>

<template #0>

- Разные истории
- Могут быть в большом количестве, в целом равноправны (за исключением main)
- Отходят от какого-то (указанного) коммита

</template>
<template #1>

Базовые команды:

- `git switch --create <branch-name>` --- создать новой ветки и переключение на неё
- `git switch <branch-name>` --- переключить на ветку
- `git branch --all` --- вывести список всех (в том числе и remote) веток
- `git branch --delete <branch-name>` --- удалить ветку

</template>
</v-switch>

---

# Удалённые ветки
`origin/<branch>`

Базовые команды:

- `git branch --set-upstream-to=origin/<branch-name> <branch-name>` --- установить связь удалённой и локальной ветки
- `git push --set-upstream origin <branch-name>` --- запушить локальную ветку в удалённый репозиторий, предварительно создав её там
- `git push origin --delete <branch-name>` --- удалить удалённую ветку


---

# Merge
<div></div>

<div grid="~ cols-2 gap-4">

<div>
Объединение историй (чаще всего двух)

- Создаёт коммит с несколькими родительскими (но не всегда)
- Могут возникнуть конфликты
- `git merge <branch-name>` --- слить ветку, в которой находимся с указанной
</div>

<center>

<v-switch>

<template #0>

<img src="/pre_merged.svg" style="width:100%; height:auto;">
</template>

<template #1>

<img src="/merge.svg" style="width:100%; height:auto;">
</template>

</v-switch>
</center>
</div>

---

# Rebase
<div></div>


<div grid="~ cols-2 gap-4">

<div>
Другой способ объединения историй

- Переприменяет изменения с указанного места
  - `git rebase <branch-name>`
- Есть интерактивная версия
  - `git rebase -i <branch-name>`
  - Также случаются конфликты
- Создаются новые коммиты
  - изменяется время создания коммита
  - изменяется коммитер
- Рекомендую бэкапить ветки
  - `git branch backup-br`
  - `git rebase <branch-name>`

</div>

<center>

<v-switch>

<template #0>

<img src="/pre_merged.svg" style="width:100%; height:auto;">
</template>

<template #1>

<img src="/rebase.svg" style="width:100%; height:auto;">
</template>

</v-switch>
</center>
</div>

---

# Клонирование и форки
<br>

- Форк --- копия репозитория на GitHub
  - Своя версия проекта. Например, Blink (на котором живёт Chrome) --- форк WebKit (на котором живёт Safari)
  - Контрибьция в большие проекты
- Клонирование --- создание локальной копии удалённого репозитория
  - `git clone <url>`
  - Автоматически настраивается удалённый репозиторий в `origin`
  - Если клонируете форк, то можно добавить и оригинал `git remote add upstream <url>`
  - `git pull <remote-name> <branch>` --- подтянуть изменения из конкретного удалённого репозитория и указанной ветки

---

# Pull Request
<br>

- Хотим влить наши изменения в main
- А мейнтейнер хочет, чтобы не было багов, код был красивый, была документация и т.д.
- Для таких вещей есть pull request (на GitHub) --- запрос на слияние ветки (может быть из форка)
- Можно ревьюить и обсуждать код, есть инструменты для контроля доступа

---

# Разрешение конфликтов
<br>

- При изменениях в одинаковых местах в разных ветках может возникнуть конфликт
- Тогда rebase и merge могут не пройти, и надо разруливать это руками

Конфликт имеет вид

```text

 <<<<<< HEAD
     some code
 =======
     some other code
 >>>>>>> branch
    ...
```

Тогда надо как-то выбрать. А возможно вообще как-то скомбинировать

---

# Домашнее задание
<br>

- Сделать [лабораторную работу по гиту](https://vkutuev.github.io/computer-workshop/01-lab-git/index.html)
- Написать сортировку пузырьком в отдельной ветке в своём репо для домашек. Сделать пулл реквест, добавив меня в ревьюеры