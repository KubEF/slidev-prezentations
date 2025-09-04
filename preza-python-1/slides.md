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
    - Основные идеи (жадные алгоритмы, динамическое программирование, рекурсия, ...)
    - Сложность алгоритмов, оптимизации
3. Базово изучить Python
    - Основные конструкции
    - Чуть-чуть внутреннего устройства
    - Некоторые библиотеки (pytest, csv, json, functools, itertools, pathlib,...)
    - Работа с виртуальным окружением, пакетный менеджер
</v-clicks>

---

# Формальные вопросы

- Занятия по четвергам в 3389 у обеих подгрупп
  - Берите с собой ноутбуки
  - Курс на HwProj: https://hwproj.ru/courses/50057
- Там надо зарегистрироваться и подать заявку на курс
- Используйте ваши имя и фамилию, желательно по-русски
- Условия домашек и материалы с пар будут там, сдавать задачи туда же


---

# Контакты

<div grid="~ cols-[1.5fr_1fr] gap-4">

<div>

- Основной канал связи -- чат в tg
  - Если используете не своё имя в Telegram, представляйтесь, кто Вы и откуда!
- Гориховский Вячеслав Игоревич
  - Почта: gorihovskyvyacheslav@gmail.com
  - tg: [@EfKub](https://t.me/EfKub)
- Кубышкин Ефим Алексеевич
  - Почта: st098235@student.spbu.ru
  - tg: [@Viacheslav_I_Gorikhovskii](https://Viacheslav_I_Gorikhovskii)
</div>

<center>

<img src="/qr_code.png">
</center>
</div>


---

# Критерии оценивания
<div></div>

1. Получаете баллы за домашку, по табличке высчитываете свою оценку за них
2. Получаете баллы за контрольные, по табличке высчитываете свою оценку за них
3. Берёте минимум из двух оценок

<div grid="~ cols-2 gap-4">
<center>

| %      |ECTS |
|:-----:|:---:|
| 92-100|  A  |
| 84-91 |  B  |
| 76-83 |  C  |
| 68-76 |  D  |
| 60-68 |  E  |

Табличка для домашних работ
</center>

<center>

| %      |ECTS |
|:-----:|:---:|
| 90-100|  A  |
| 80-89 |  B  |
| 70-79 |  C  |
| 61-69 |  D  |
| 50-60 |  E  |

Табличка для контрольных работ
</center>
</div>


<style>
table {
  width: 80%;
  border-radius: 5px;
  margin:15px;
}

th {
  background: rgba(0, 0, 0, 0.1);
  color: black;
  padding: 10px;
}

td {
  padding: 7px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>

---

# Проверка домашних заданий

- Каждая домашняя работа оформляется как pull request в свой репозиторий
  - Одна домашка -- один pull request
  - Следите за оформлением кода, коммитов, комментариев и т.д. (научим этому позже)
- Если первый запрос на ревью был запрошен до дедлайна (и там было что-то содержательное во всех задачах), то можно получить максимум баллов. Если нет, то только половину
- После ревью вам выставляют баллы, и говорят, что не так
- Поправляете замечания $\to$ делаете запрос на ревью $\to$ можете получить побольше баллов
- Максимум можно сделать четыре запроса на ревью (по одной домашке)
- После четвёртого ревью ставятся те баллы, на которые вы наработали



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

<div grid="~ cols-[1.2fr_2fr] gap-2">
<div>
3.12.2008 вышла первая версия Python3

- Устраняет многие недостатки архитектуры
- Упрощает синтаксис
- Создаёт проблемы из-за не полной совместимости с Python2

Где-то до сих пор можно встретить Python2
</div>
<div>

| Python 2 | Python 3 |
|:----------:|:----------:|
|`print "Hello"` | `print("Hello")` |
|`5 / 2 = 2` | `5 / 2 = 2.5` |
|`input() = raw_input() -> str` | `input() -> str` |
|`range(5) -> list` | `range(5) -> iterator` |
|`1 < "2" = True` | `1 < "2" -> TypeError` |
|`b"bytes" == "bytes"` | `b"bytes" ≠ "bytes"` |
</div>
</div>

<style>
table {
  width: 100%;
  border-radius: 5px;
  /* margin:2px; */
}

th {
  background: rgba(0, 0, 0, 0.1);
  color: black;
  padding: 7px;
}

td {
  padding: 7px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>

---


# Как запускать программы
<br>

## Интерактивная среда (REPL) Python

Можно просто через `python`, а можно через [IPython](https://pypi.org/project/ipython/)

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


---

# Пример
<div></div>

<<< @/snippets/example.py python {1-5|8-9|11-15|17-22|all}{lines: true}
<center>
<button @click="$slidev.nav.go(15)" title="Пропустить базу" class="slidev-icon-btn">
    <carbon:arrow-right class="text-3xl"/>
  </button>
</center>


---

# Типы

Материалы взяты [отсюда](https://learnxinyminutes.com/ru/python/)

<v-switch>

<template #0>

### Специальные и логические

<div grid="~ cols-2 gap-4">
<div>

```python [ipython]
>>> None is None
True
>>> a, b = [1, 2], [1, 2]
>>> a == b, a is b
(True, False)
>>> True and False
False
>>> True or False
True
>>> True or (1 / 0)
True
>>> not False
True
>>> 1 < 2 < 3
True

```

</div>

<div>

```python [ipython]
>>> 0 == False
True
>>> 1 == True
True
>>> 3 == True
False
>>> -1 == False
False
>>> bool(100)
True
>>> bool(-10)
True
>>> bool(0)
False
>>> 100 + a
101

```

</div>
</div>
</template>

<template #1>

### Числовые

<div grid="~ cols-2 gap-4">
<div>

```python [ipython]
>>> 5 + 3 - 2 * 4
0

>>> 5 / 3
1.6666666666666667

>>> 5 // 3
1

>>> 5 % 3
2

>>> 5 ** 3
125

```
</div>

<div>

```python [ipython]
>>> type(7)
int

>>> type(.7)
float

>>> type(7j)
complex
```

</div>
</div>
</template>

<template #2>

### Строки

```python [ipython]
>>> "Hello" + ", world!"
'Hello, world!'
>>> 'Hello' ', ' 'world!'
'Hello, world!'
>>> name = "Efim"
>>> name[0]
'E'
>>> f"name {name} consists of {len(name)} letters"
'name Efim consists of 4 letters'
>>> name[0] = "A"
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[69], line 1
----> 1 name[0] = "A"

TypeError: 'str' object does not support item assignment

```

</template>

<template #3>


### Списки

<div grid="~ cols-2 gap-4">
<div>
```python [ipython]
>>> [] # или list()
[]
>>> [0] * 4
[0, 0, 0, 0]
>>> xs = [1, 2, 3, 4]
>>> len(xs)
4
>>> xs[0]
1
>>> xs[0] = -1
>>> xs
[-1, 2, 3, 4]
>>> xs.append(42)
[-1, 2, 3, 4, 42]
>>> del xs[0] # или xs.pop(0)
[2, 3, 4, 42]
```

</div>

<div>

```python [ipython]
>>> ys = [10, 11, 12]
>>> xs + ys
[2, 3, 4, 42, 10, 11, 12]
>>> xs.extend(ys)
>>> xs
[2, 3, 4, 42, 10, 11, 12]
>>> xs[2:5]
[4, 42, 10]
>>> xs[:3]
[2, 3, 4]
>>> xs[::-1]
[12, 11, 10, 42, 4, 3, 2]

```

</div>
</div>
</template>

<template #4>

### Кортежи

<!-- <div grid ="~ cols-2 gap-4">
<div> -->

```python [ipython]
>>> tuple([1, 2, 3])
(1, 2, 3)
>>> _
(1, 2, 3)
>>> _ + _
(1, 2, 3, 1, 2, 3)
>>> _[0] = 0
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[89], line 1
----> 1 _[0] = 0

TypeError: 'tuple' object does not support item assignment

```

</template>
</v-switch>


---

# Функции `print` и `input`

Как  сделать минимальный CLI

```python [ipython]
>>> print?
Signature: print(*args, sep=' ', end='\n', file=None, flush=False)
Docstring:
Prints the values to a stream, or to sys.stdout by default.
...
>>> input?
Signature: input(prompt='', /)
Docstring:
Read a string from standard input.  The trailing newline is stripped.
...


>>> print(1, "+", 2, "=", 3)
1 + 2 = 3
>>> input("Enter your name: ")
Enter your name: Efim
'Efim'
>>> print('my', 'name', 'is', 'Efim', sep=input("your sep: "))
your sep: !!
my!!name!!is!!Efim

```


---

# Поток управления

Куда катится наша программа

<v-switch>

<template #0>

### Условные операторы `if`/`else`

```python [ipython]
>>> x = 42

>>> if x % 5 == 0:
...     print("fizz")
... elif x % 3 == 0:
...     print("buzz")
... else:
...     pass
... 
buzz

>>> "even" if x % 2 == 0 else "odd"
even
```

</template>
<template #1>

### Циклы `for`/`while`

<div grid="~ cols-2 gap-4">
<div>

```python [ipython]
>>> for i in range(5):
...     if i % 2 == 0:
...         print(i)
...     elif i == 3:
...         break
...     else:
...         continue
... 
0
2
>>> for animal in animals:
...     print(f"{animal} is cute")
... 
dog is cute
cat is cute
raccon is cute
```

</div>
<div>

```python [ipython]
>>> i = 0
>>> while i < 10:
...     i += 1
... 
>>> i
10
```

- `break` -- для выхода из цикла
- `continue` -- для перехода на следующую итерацию

</div>
</div>

</template>
</v-switch>

---

# Ошибки
<div></div>
<!-- Как понять, что именно ты сделал не так -->

- Получаем ошибку в момент выполнения строчки интерпретатором
  - Следовательно, не получим ошибку, пока не начнём выполнять соответствующую строку
- Сообщение об ошибке обычно довольно информативное, часто указывает на конкретное место в коде $\Rightarrow$ **Обязательно его читаем**

<v-switch>
<template #0>

<div grid="~ cols-2 gap-4">
<div>

```console [bash]
[efim@kubef tmp]$ python test.py 
  File "/tmp/test.py", line 1
    for i in range(5)
                     ^
SyntaxError: expected ':'
```
</div>

<div>

```python [error.py] {*}{lines:true}
for i in range(5)
    print(i)
```
</div>
</div>
</template>

<template #1>
<div grid="~ cols-[1fr_2fr] gap-4">
<div>

```python [ipython]
>>> def f(arg):
...     if arg % 2 == 0:
...         print11(arg)
...     else:
...         print(arg * 10)
...
>>> f(5)
50 
```

</div>
<div>

```python [ipython]

>>> f(6)
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
Cell In[123], line 1
----> 1 f(6)

Cell In[121], line 3, in f(arg)
      1 def f(arg):
      2     if arg % 2 == 0:
----> 3         print11(arg)
      4     else:
      5         print(arg * 10)

NameError: name 'print11' is not defined

```
</div>
</div>
</template>

</v-switch>


---


# <u>Динамический</u> интерпретируемый язык
По ходу дела разберёмся

Динамический == известно только на момент выполнения

<v-switch>

<template #1>

Интерпретатор не проверяет типы, получишь ошибку в runtime

```python [ipython]{*}
>>> def imposter():
...     print(2 / "a")
... 
>>> print("this is fine")
this is fine
>>> imposter()
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[3], line 1
----> 1 imposter()

Cell In[1], line 2, in imposter()
      1 def imposter():
----> 2     print(2 / "a")

TypeError: unsupported operand type(s) for /: 'int' and 'str'
```
</template>
<template #2>

Связывание имён происходит также во время выполнения

```python [ipython]{*}
>>> # никогда так не пишите!
... def f():
...   print(x)
... 

>>> x = 1 # может быть определено вообще в другом модуле

>>> f()
1

```
</template>

</v-switch>
---

# Динамический <u>интерпретируемый</u> язык
<div></div>

Интерпретируемый язык -- выполняющийся построчно

- Python интерпретируемый не в том же смысле, в каком, например, bash
- Есть промежуточное представление -- байт-код (файл с расширением `*.pyc`)
  - Виртуальная машина исполняет этот байт-код
  - Похожим образом работает Java (там JVM)

<v-switch>

<template #0>

<center>
<img src="/python-pipeline.gif" style="width:50%; height:auto;" m-t="10" > 
</center>

</template>
<template #1>

```python [ipython]
>>> import dis

>>> dis.dis("print('hello, world')")
  0           RESUME                   0

  1           LOAD_NAME                0 (print)
              PUSH_NULL
              LOAD_CONST               0 ('hello, world')
              CALL                     1
              RETURN_VALUE


```

</template>
</v-switch>

---

# Задания
<br>

Задания сдаются на hwProj: https://hwproj.ru/courses/50057/homeworks

- Прикрепите байт-код программы, вычисляющий куб натурального числа
- Вычислите в режиме интерпретации число Фибоначчи с номером $n$, где $n = 10^6$ + длина фамилии
- Реализуйте решето Эратосфена
- У вас есть монеты номиналом в `длина имени`, `длина фамилии`, `длина отчества`(если нет, то `19`). Напишите программу, выписывающую размен считанного с консоли числа, если таковой возможен. В противном случае выведите "-42!"
- Реализуйте функцию, которая сравнивает две строки в обратном лексикографическом порядке.
