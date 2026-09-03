---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Git
info: |
  ## Теория по Git
drawings:
  persist: false
transition: slide-left
mdc: true
seoMeta:
  ogImage: https://cover.sli.dev
fonts:
  sans: Robot
  mono: JetBrains Mono
favicon: /git-icon.svg
hideInToc: true
---

# Git
Всё, что нужно знать

---
hideInToc: true
layout: full
---

<div grid="~ cols-2 gap-4">
<div>
<Toc columns="1" maxDepth="2"/>
</div>

<div class="grid place-items-center h-full">
<img src="https://git-scm.com/images/branching-illustration@2x.png">
</div>

</div>

---

# Мотивация
<br>

- Откат неудачных изменений
- Отслеживание изменений
- Установление авторства
- Совместное владение кодом

---
level: 2
---

# Что нужно для примитивной VCS
<br>

- Делать папки-бэкапы
- С временной отметкой в имени
- Каждый раз копировать проект в такую папку. Можно архивировать старые версии
- Нужен diff tool

---

# Распределённые и централизованные VCS
Немного истории

<v-switch>

<template #0>

## Локальные системы

<div grid="~ cols-2 gap-4">

<div>
Примеры

- Source Code Control System (1972)
- Revision Control System (1985), релиз 2022 года

Последняя версия + межверсионные изменения
</div>

<center>

<img src="https://git-scm.com/book/en/v2/images/local.png">
</center>

</div>

</template>

<template #1>

## Централизованные системы

<div grid="~ cols-2 gap-4">

<div>
Примеры

- CVS (1990 - 2008)
- Perforce (1995) около 400 000 пользователей
- Subversion (2004) в 2011 году популярность сопоставима с Git

</div>

<center>

<img src="https://git-scm.com/book/ru/v2/images/centralized.png">
</center>

</div>

</template>

<template #2>

## Распределённые системы

<div grid="~ cols-2 gap-4">

<div>
Примеры

- Mercurial (2005)
- Git (2005)
- Некоторые другие, значительно менее популярные

Клиент имеет локальную копию репозитория

</div>

<center>

<img src="https://git-scm.com/book/en/v2/images/distributed.png"  style="width:75%; height:auto;">
</center>

</div>

</template>

</v-switch>


---

# Git
Мы без него никуда

- Распределённая VCS
- Был создан Линусом Торвальдсом в 2005г
- Главные сущности: коммиты и ветки
- История -- просто список коммитов

---
level: 2
---

# Жизненный цикл файлов

- Не отслеживается (untracked) -- новый файл (или удалённый)
- Изменён (modified) -- отслеживаемый файл, который изменили
- Индексирован (staged) -- отслеживаемый и изменённый файл, который готов к фиксации
- Зафиксирован (commited) / неизменён (unmodified) -- отслеживаемый файл, который был зафиксирован

<center>
<img src="https://git-scm.com/book/ru/v2/images/lifecycle.png"  style="width:70%; height:auto;" m-t="5">
</center>

---
level: 2
---

# Commit
Основа всего

<div grid="~ cols-2 gap-4">
<div>

- Слепок репозитория
- Ссылка (хэш) на предыдущий коммит
- Автор изменений
- Создатель коммита
- Сообщение коммита
- Время и дата коммита

</div>

<center>
<img src="/commit-scheme.svg" style="width:70%; height:auto;">
</center>
</div>

---
level: 2
---

# Ветки

<div grid="~ cols-2 gap-4">
<div>

- Разные истории
- Могут быть в большом количестве, в целом равноправны (за исключением main)
- Отходят от какого-то (указанного) коммита

</div>

<div>

Базовые команды:

- `git switch --create <branch-name>` -- создать новую ветку и переключиться на неё
- `git switch <branch-name>` -- переключиться на ветку
- `git branch --all` -- вывести список всех (в том числе remote) веток
- `git branch --delete <branch-name>` -- удалить ветку

</div>
</div>

---

# Удалённые ветки
`origin/<branch>`

Базовые команды:

- `git branch --set-upstream-to=origin/<branch-name> <branch-name>` -- установить связь удалённой и локальной ветки
- `git push --set-upstream origin <branch-name>` -- запушить локальную ветку в удалённый репозиторий, предварительно создав её там
- `git push origin --delete <branch-name>` -- удалить удалённую ветку

---

# Merge
<div></div>

<div grid="~ cols-2 gap-4">

<div>
Объединение историй (чаще всего двух)

- Создаёт коммит с несколькими родительскими (но не всегда)
- Могут возникнуть конфликты
- `git merge <branch-name>` -- слить ветку, в которой находимся с указанной
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

- Форк -- копия репозитория на GitHub
  - Своя версия проекта. Например, Blink (на котором живёт Chrome) -- форк WebKit (на котором живёт Safari)
  - Контрибьция в большие проекты
- Клонирование -- создание локальной копии удалённого репозитория
  - `git clone <url>`
  - Автоматически настраивается удалённый репозиторий в `origin`
  - Если клонируете форк, то можно добавить и оригинал `git remote add upstream <url>`
  - `git pull <remote-name> <branch>` -- подтянуть изменения из конкретного удалённого репозитория и указанной ветки

---

# Pull Request
<br>

- Хотим влить наши изменения в main
- А мейнтейнер хочет, чтобы не было багов, код был красивый, была документация и т.д.
- Для таких вещей есть pull request (на GitHub) -- запрос на слияние ветки (может быть из форка)
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

# GitHub
Соцсеть программистов

- Веб-сервис для хостинга репозиториев
- Умеет рендерить markdown
- Средства для просмотра диффов и истории
- Средства командной разработки ([issues](https://github.com/features/issues), [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests), [wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis), [github actions](https://github.com/features/actions), [github pages](https://docs.github.com/en/pages))

---
level: 2
---

# Полезные (необходимые) файлы
лицензия, `README`, `.gitignore`

- Лицензия документирует (юридически), как ваш код можно использовать/модифицировать/распространять. Есть много разных, мы советуем либо [MIT](https://en.wikipedia.org/wiki/MIT_License), либо [Apache 2](https://en.wikipedia.org/wiki/Apache_License)
- `README` показывается на странице вашего репозитория, обычно туда пишут основные сведения, навигацию по репозиторию и полезные ссылки. Наличие хорошего `README` -- показатель культуры
- `.gitignore` содержит названия файлов, которые git будет игнорировать. Там должны быть все артефакты сборки, локальные зависимости и просто всё, что вы не хотите отправлять в интернет

---

# Советы и хорошие практики
<br>

- Писать **адекватные сообщения** к коммитам
  - Сообщения типа "Fix" или "." **недопустимы**
- **Не коммитить** то, что может быть автоматически сгенерировано из исходников
- Коммитить как можно чаще
  - Сделали что-то осмысленное -- коммитим
  - Можно будет потом слить вместе (squash) часть коммитов через `git rebase -i ...`
- Коммит не должен содержать в себе файлы/строки, не относящиеся к изменениям
  - `git add .` лучше не использовать

---

# Ещё полезные команды

- `git commit --amend` -- дописать изменения к уже сделанному коммиту
- `git stash` -- откатить все незафиксированные изменения (`git stash apply` вернёт их обратно)
- `git add --patch` -- в интерактивном режиме выбрать фрагменты изменений, которые нужно добавить в индекс
- `git log --graph --oneline --all` -- история коммитов в виде графа
- `git reset HEAD^` -- откатить последний коммит, но оставить все изменения
- `git reset HEAD^ --hard` -- откатить последний коммит и выкинуть его изменения
- ...