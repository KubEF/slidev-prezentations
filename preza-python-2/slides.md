---
# You can also start simply with 'default'
theme: seriph
themeConfig:
  primary: '#069494'
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Python практика 2
info: |
  ## Практика по Python 2
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

# Практика по Python 2
Немножко про git и GitHub

---
hideInToc: true
layout: full
# image: https://raw.githubusercontent.com/louim/in-case-of-fire/refs/heads/master/in_case_of_fire.png
# backgroundSize: 20em 70%
---

<!-- # Содержание
<div></div> -->
<div grid="~ cols-2 gap-4">
<div>
<Toc columns="1" maxDepth="2"/>
</div>

<div class="grid place-items-center h-full">
<img src="https://raw.githubusercontent.com/louim/in-case-of-fire/refs/heads/master/in_case_of_fire.png">
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

# Жизненный  цикл файлов

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
transition: slide-up
---

# Практика
Пора идти за консоль

Пользоваться GUI и TUI **настойчиво не рекомендуется** (требовать знания работы с консолью всё равно будем)

План:

1. Поставим git и минимально настроим под себя
2. Создадим локальный репозиторий
3. Покоммитим, походим по истории


---
level: 3
transition: slide-up
---

# Базовая настройка
<div></div>

- Ставим git с помощью пакетного менеджера

::code-group

```sh [windows ~i-logos:microsoft-windows-icon~]
winget install --id Git.Git --exact --source winget
```

```sh [ubuntu ~i-logos:ubuntu~]
apt-get install git
```

```sh [arch ~i-logos:archlinux~]
pacman -S git
```

::

- Меняем приложение для редактирования и открываем конфиг

::code-group

```sh [windows ~i-logos:microsoft-windows-icon~]
git config --global core.editor "notepad.exe"
git config --global --edit
```

```sh [linux ~i-logos:linux-tux~]
git config --global core.editor nano
git config --global --edit
```

::

- В конфиге меняем всё под себя

```vim [C:\Users\<user>\.gitconfig or ~/.gitconfig]
[user]
        name = "<Name Surname>"
        email = <example@mail.ru>
[core]
        editor = <your best editor>

```

---
level: 3
transition: slide-up
---

# Инициализация, первые коммиты
<div></div>

<v-switch>

<template #0>

- Инициализируем репозиторий с названием `test_repo`

```sh
git init test_repo
cd test_repo
git status
```

</template>

<template #1>

- Создадим `.py` файл с реализацией алгоритма Евклида и файл с номером версии питона

```text [структура репозитория]
.
├── .python-version
└── src
    └── euclid.py
```

- Проверяем статус репозитория

```sh
git status
```

</template>

<template #2>

- Добавляем файл

```sh
git add src/euclid.py
git status 
```

</template>

<template #3>

- Коммитим его с содержательным сообщением

```sh
git commit --message "Add an implementation of Euclid's algorithm"
git status
```

</template>

<template #4>

- То же самое со вторым файлом

```sh
git add .python-version
git commit -m "Add python version"
git status
```

</template>

</v-switch>


````md magic-move {at:1}

```text
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)

```

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .python-version
        src/

nothing added to commit but untracked files present (use "git add" to track)

```

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   src/euclid.py

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .python-version
```

```text
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .python-version

nothing added to commit but untracked files present (use "git add" to track)
```

```text
On branch main
nothing to commit, working tree clean

```

````

---
level: 3
---

# Изменения, откат в прошлое
<div></div>

<v-switch>

<template #0>

- Поменяем функцию, чтобы она ожидаемо работала с отрицательными числами

```sh
git diff && git status
```

</template>

<template #1>

- Закоммитим и посмотрим в логи

```sh
git add src/euclid.py 
git commit -m "Add negative numbers handling"
git log
```

</template>

<template #2>

- Можем вернуться на состояние любого коммита. Например, если мы вдруг обновили версию питона, и уже закоммитили изменения, но хотим посмотреть, что было раньше

```sh
git add .python-version 
git commit --message "Bump python version"
git checkout ed0bfd6c33cd75b8570557290a5af6a39e1966fb
git log
```

</template>

<template #3>

- Обратно переключаемся в ту ветку, в которой были

```sh
git checkout main
git log
```

</template>
</v-switch>

````md magic-move {at:1}

```text

diff --git a/src/euclid.py b/src/euclid.py
index eb0e056..da87a10 100644
--- a/src/euclid.py
+++ b/src/euclid.py
@@ -1,9 +1,10 @@
 def gcd(a, b):
     while b != 0:
         a, b = b, a % b
-    return a
+    return abs(a)
 
 
+assert gcd(-15, 3) == 3

On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/euclid.py
no changes added to commit (use "git add" and/or "git commit -a")

```

```text

commit 08af6dbbc7ee36a1871d4f5c86faafbf97d6c617 (HEAD -> main)
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 18:31:45 2025 +0300

    Add negative numbers handling

commit ed0bfd6c33cd75b8570557290a5af6a39e1966fb
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 18:02:30 2025 +0300

    Add python version

commit 1cc30bf396f84d739635c84e1f754f6ea8ff2f34
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 17:57:50 2025 +0300

    Add an implementation of Euclid's algorithm


```
```text
commit ed0bfd6c33cd75b8570557290a5af6a39e1966fb (HEAD)
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 18:02:30 2025 +0300

    Add python version

commit 1cc30bf396f84d739635c84e1f754f6ea8ff2f34
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 17:57:50 2025 +0300

    Add an implementation of Euclid's algorithm

```

```text
commit f50e42e08d2d02fce2c05bdb0a4a4b601db9276a (HEAD -> main)
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 18:33:23 2025 +0300

    Bump python version

commit 08af6dbbc7ee36a1871d4f5c86faafbf97d6c617
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 18:31:45 2025 +0300

    Add negative numbers handling

commit ed0bfd6c33cd75b8570557290a5af6a39e1966fb
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 18:02:30 2025 +0300

    Add python version

...

```


````

---
level: 2
---

# Чуть-чуть про ветки

- Главная ветка обычно называется `main`
- Один из основных инструментов git. Лучше пользоваться почаще
- Две ветки можно слить в одну, но это иногда вызывает боль
- В [github flow](https://docs.github.com/ru/get-started/using-github/github-flow) принято (и у нас тоже будет так), что никто не коммитит в `main`, туда всё попадает только через pull request

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
level: 2
transition: slide-up
---

# Практика
Опять за консоль

План:

1. Свяжем локальный репозиторий с удалённым
2. Создадим полезные файлы и отправим их на удалённый репозиторий
3. Научимся получать изменения из удалённого репозитория


---
level: 3
transition: slide-up
---

# Связываем локальный репозиторий с удалённым
<div></div>

- В браузере создаём новый репозиторий
- Из предложенных опций будем делать "…or push an existing repository from the command line"

```sh
git remote add origin https://github.com/<your-username>/test_repo.git 
git branch -M main # перезаписывает имя главной ветки на main
git push --set-upstream origin main # -u сокращение для --set-upstream
```

- Если вам не дают запушить джае при правильном пароле, то надо сгенерировать [access token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app#about-user-access-tokens): `settings` $\to$ `developer setting` $\to$ `personal access token` $\to$ `tokens (classic)` $\to$ `generate new token` $\to$ обязательно выбрать `repo` в разрешениях $\to$ `generate`
- Этот токен нужно скопировать и вставлять вместо пароля
- Если не хотите так, то настройте [доступ по ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---
level: 3
transition: slide-up
---

# Создаём `.gitignore`

- Идём на https://www.toptal.com/developers/gitignore и копируем (или ставим расширение в vscode)
- Создаём `.gitignore` и вставляем туда
- Попробуем создать [виртуальную среду](https://docs.python.org/3/library/venv.html), которая есть обычно в `.gitignore`

```sh
python -m venv ./venv
ls . && git status
```

```text
src/  venv/

On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore

nothing added to commit but untracked files present (use "git add" to track)
```

- Git игнорирует папку `venv`

---
level: 3
transition: slide-up
---

# Пишем README
Лицо репозитория

- В корне репозитория создаём файл `README.md` и пишем туда какие-нибудь слова о репозитории

```md [README]

# Тестовый репозиторий

Этот репозиторий создан для обучения Git и GitHub

## Важное назидание

!["alt text"](https://raw.githubusercontent.com/louim/in-case-of-fire/refs/heads/master/in_case_of_fire.png)

```

- Пушим всё на удалённый репозиторий

```sh
git add .gitignore
git commit -m "Add .gitignore for python project"
git add README.md
git commit -m "Add simple README"
git push
```

---
level: 3
---

# Создаём лицензию удалённо,  вытягиваем изменения
Имитируем активность

<v-switch>
<template #0>

- Идём на страницу репозитория ~~любуемся нашим README~~, нажимаем `Add file`, создаём новый файл, в название вводим LICENSE
- Нам предлагают выбрать из шаблонных, мы с радостью соглашаемся и выбираем MIT
- Создаём и коммитим
- Теперь вытягиваем изменения к себе и смотрим статус

```sh
git fetch
git status
```

```text
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean
```

</template>

<template #1>

- Смотрим на изменения

```sh
git diff main origin/main
```

```text
diff --git a/LICENSE b/LICENSE
new file mode 100644
index 0000000..d98a661
-- /dev/null
++ b/LICENSE
@@ -0,0 +1,21 @@
+MIT License
+
+Copyright (c) 2025 Efim Kubishkin
+
+Permission is hereby granted, free of charge, to any person obtaining a copy
+of this software and associated documentation files (the "Software"), to deal
+in the Software without restriction, including without limitation the rights
...

```

</template>

<template #2>

- Применяем эти изменения

```sh
git pull
git status && git log
```

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

commit c5a85de75a67506b157c827abe164caed84ec5bf (HEAD -> main, origin/main, origin/HEAD)
Author: Efim Kubishkin <efimkub@mail.ru>
Date:   Tue Sep 9 23:21:13 2025 +0300

    Create LICENSE

...

```

</template>

</v-switch>


---

# Советы и хорошие практики
<br>

- Писать **адекватные сообщения** к коммитам
  - Сообщения типа "Fix" или "." **недопустимы**
- **Не коммитить** то, что может быть автоматически сгенерировано из исходников
- Коммитить как можно чаще
  - Сделали что-то осмысленное — коммитим
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

---

# Домашнее задание
<br>

1. Доделываем всё, что не успели доделать на практике
2. Создаём новый репозиторий, куда будете кидать домашку
    - В `README` описание репозитория, ссылка на почту, тг и имя
    - Аккуратная иерархия директорий, чтобы не запутаться самому и не запутывать проверяющих
    - **НЕ** в один коммит, примите во внимание советы, которые сегодня звучали 
    - Добавляем KubEF, WoWaster, yurii-litvinov в коллабораторы
    - Пока **НЕ** кладём файлы из первой домашки
