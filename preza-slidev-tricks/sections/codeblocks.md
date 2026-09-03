---
layout: section
transition: slide-up
level: 1
---

# Код-блоки

---

# Подсветка строк кода

Пошаговое выделение диапазонов

```python {1-4|6-7|9-14|all}{lines:true}
class Squares:
    def __init__(self, n: int):
        self.values = [i**2 for i in range(n)]
        self.indx = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.indx < len(self.values):
            r = self.values[self.indx]
            self.indx += 1
            return r
        raise StopIteration
```

- `{1-4|6-7|9-14|all}` — последовательности выделения по кликам
- `{*}` — выделить всё с самого начала
- `{lines:true}` — показать номера строк

> `preza-python-11` «Протокол итератора». Та же схема с `{*}{lines:true}` в `preza-python-1`.

---
level: 2
---

# Именованные блоки кода

Заголовок-вкладка у блока: `[имя]`

```python [ipython]
>>> None is None
True
>>> a, b = [1, 2], [1, 2]
>>> a == b, a is b
(True, False)
```

<div grid="~ cols-2 gap-4">
<div>

```console [bash]
[efim@kubef ~]$ python test.py
hello, test
```

</div>
<div>

```python [error.py] {*}{lines:true}
for i in range(5)
    print(i)
```

</div>
</div>

> `[ipython]` — фейковый REPL-вывод (половина слайдов `preza-python-1`). `[bash]` — консоль. `[error.py]` — имя файла.

---
level: 2
---

# code-group: вкладки

Несколько блоков в табах, переключение кликом

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

<br>

- Синтаксис: `::code-group` ... `::`
- Заголовок вкладки — `[имя ~i-иконка~]`
- Иконки логируются в safelist `uno.config.ts` аддона, иначе не попадут в сборку

> `preza-python-2` «Базовая настройка»: установка git на три ОС.

---
level: 2
---

# Импорт файла: `<<<`

Вставить код из файла, `@` — корень презентации

```md
<<< @/snippets/example.py python {1-5|8-9|11-15|17-22|all}{lines: true}
```

<div></div>

<<< @/snippets/example.py python {1-5|8-9|all}{lines: true}

> `preza-python-1` «Пример»: целая программа лежит в `snippets/`, на слайде — только импорт с пошаговой подсветкой. Код не дублируется в слайде.

---
level: 2
---

# magic-move: анимация между блоками кода

Код «перетекает» из одного состояния в другое

````md magic-move {at:1}

```python
with open("path/to/file.txt", "a") as file:
    content = file.readlines()
    if content:
        file.writelines(reversed(content))
    print(content)
```

```python
file = open("path/to/file.txt", "a")
try:
    content = file.readlines()
    if content:
        file.writelines(reversed(content))
    print(content)
finally:
    file.close()
```

````

> `preza-python-9` «with → try/finally». Нужны ЧЕТЫРЕ бэктика для внешнего фенса, чтобы внутри жили трёхбэктиковые блоки. `{at:1}` — анимация начинается со второго клика.

---
level: 2
---

# magic-move: варианты

````md magic-move

```yaml {1-3|all}
name: Ruff
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
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

> `preza-python-5` «CI», `preza-python-2` «git status». Подсветка строк работает и в magic-move: `{*|2-3,4,9}` как в `preza-clash`.

---
level: 2
---

# Вложенные фенсы: ````md

Показать код, внутри которого есть блоки кода

`````md md

::code-group

```sh [пример]
echo hello
```

::

`````

> Хак: ` `````md md` (5 бэктиков) — выводим markdown как код, чтобы показать синтаксис code-group. Используется для документации фишек прямо в слайдах.
