---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Python практика 5
info: |
  ## Практика по Python 5
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
---

# Практика по Python 5
стандарты оформления кода: PEP8

---

# Где искать информацию
<br>

- Python Enhancement Proposals ([PEP](https://peps.python.org/pep-0000/)) --- набор документов, касающихся Python, программирования на нем и других связанных тем
- [PEP8](peps.python.org/pep-0008/) --- Style Guide For Python Code, стандарт оформления python кода
  - Есть другие стандарты, но общепринят этот
  - Если в проекте принято что-то другое, то надо использовать принятые соглашения!
  - У нас будет PEP8


---

# Внутренности PEP8
Как надо, а как не надо

За подробностями идём смотреть [PEP8](https://peps.python.org/pep-0008/)

Важные общие договорённости:

- Нейминг
  - Названия переменных и функций со строчной буквы в `snake_case`
  - Названия классов с заглавной буквы в `CamelCase`
  - Константы полностью заглавными буквами в `SNAKE_CASE`
  - Всё, что начинается с `_` считается "для внутреннего пользования"
- Пробелы (в количестве 4 штук), а не табы
- Максимальная длина строки 79 символов (но часто ставят чуть-чуть больше ~120)
- Функции и определения классов наивысшего уровня окружаются двумя пустыми строками
- Определения методов в классе окружаются одной пустой строкой


---

# Линтеры и форматтеры
<div></div>

- Линтер --- инструмент для статического анализа кода на предмет наличия стилистических и иных ошибок
- Форметтер --- программа для автоматического преобразования кода без изменения его семантики в соответствии с принятыми правилами

Для питона есть много разных:

- Линтеры: [ruff](https://docs.astral.sh/ruff/c), [flake8](https://flake8.pycqa.org/en/latest/), [pylint](https://www.pylint.org/), [pycodestyle](https://pycodestyle.pycqa.org/en/latest/), ...
- Форматтеры: [ruff](https://docs.astral.sh/ruff/), [black](https://black.readthedocs.io/en/stable/), [YAPF](https://github.com/google/yapf), ...

В нашем курсе будем использовать [ruff](https://docs.astral.sh/ruff/)

---

# Настроим ruff
<div></div>

Всю информацию можно (и нужно!) искать в [документации](https://docs.astral.sh/ruff/)

- Ставим через `pip` или через ваш пакетный менеджер
- Можно конфигурировать в файле `pyproject.toml`, в [документации](https://docs.astral.sh/ruff/rules/) есть список правил

```toml [pyproject.toml]
[tool.ruff.lint]
  extend-select = [
      "F",        # Правила Pyflakes
      "W",        # Предупреждения PyCodeStyle
      "E",        # Ошибки PyCodeStyle
      "I",        # Правильно сортировать импорты
      "N",        # Нейминг
      "UP",       # Предупреждать, если что-то можно изменить из-за новых версий Python
      "C4",       # Ловить неправильное использование comprehensions, dict, list и т.д.
      "FA",       # Применять from __future__ import annotations
      "ISC",      # Хорошее использование конкатенации строк
      "ICN",      # Использовать общие соглашения об импорте
      "RET",      # Хорошие практики возврата
      "SIM",      # Общие правила упрощения
  ]
```

---

# Базовое использование
<div></div>

- Линтер
  - `ruff check <files>`
  - `ruff check <files> --fix`
- Форматтер: `ruf format <files>`

Лучше [настроить свою IDE](https://docs.astral.sh/ruff/editors/setup/), тогда она будет подсвечивать предупреждения


---

# Continuous Integration
<div></div>

Автоматическая сборка, запуск тестов, линтеров и ещё чего-нибудь

- Убеждаемся, что актуальное состояние проекта хотя бы собирается
- Не даём обманывать ни себя, ни других

````md magic-move

```yaml 
name: Ruff
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install ruff
      # Update output format to enable automatic inline annotations.
      - name: Run Ruff
        run: ruff check --output-format=github .
```

```yaml
name: Ruff
on: push
jobs:
  ruff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/ruff-action@v3
```

````

---

# Домашнее задание
<div></div>

- Настроить себе линтер и форматтер
- Переписать самую большую по количеству строк домашку
- Настроить CI (*)
