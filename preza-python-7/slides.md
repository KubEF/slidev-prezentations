---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Python практика 7
info: |
  ## Практика по Python 7
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

# Практика по Python 7

База про функции

---

# Декомпозиция
<br>

Сложная задача – сложная, а хотим простую. Так что разобьём сложную задачу на несколько простых

- Один из главных подходов к решению задач в принципе
- Если простые задачи кажутся всё ещё сложными, то можно разбить ещё раз (или не раз)
- В идеале простые задачи должны быть изолированными
- Во многом искусство


---

# Принцип единой ответственности
<br>

Каждая единица системы (например, функция) должна отвечать только за одну часть функциональности

- Первый из принципов [SOLID](https://en.wikipedia.org/wiki/SOLID)
- Применимо на многих уровнях (хотя изначально про ООП): функция, класс, модуль
  - Название помогает: если оно очень сложное, то скорее всего вы делаете что-то не то
- Упрощает понимание системы
- Упрощает отладку
- По духу схож с другим важным принципом [KISS](https://en.wikipedia.org/wiki/KISS_principle) (а в чём отличие?)

---

# Механизмы для декомпозиции в Python

- Модули – базовая структурная единица проекта
- Классы – мощь ООП
- <span v-mark.red>Функции</span> – рабочие лошадки

Можно вообще только на функциях

Очень важно:

- Аккуратно называть функции
- Писать документацию к функциям
- Тестировать функции

---

# База
<br>

- В качестве имени можно использовать буквы, цифры (не первая), подчеркивания (вообще, можно глянуть PEP8, там много всего)
- `return` указывать не обязательно, тогда возвращается `None`
- Для документации используются строковые литералы, она легко доступна в коде через специальное поле, функцию `help` или прямо в IDE

```python
>>> def _my_function(arg1, arg2, *args, **kwargs):
...     """Description"""
...     print("Hello")
...  

>>> _my_function.__doc__
'Description'
```

---

# База

<div></div>

- Аргументы могут быть позиционными или именованными
- У аргументов могут быть значения по умолчанию
- Передача аргументов происходит через присваивание (by assignment)
  - Присваивание не создает новый объект, только новую ссылку на него
  - Если передаваемый аргумент изменяемый, то поведение может быть неожиданным

```python
>>> def append_smth(src_list, value=None):
...     if value is None:
...         src_list.append(randint(0, 256))
...     else:
...         src_list.append(value)
>>> my_list = [1, 2]
>>> append_smth(my_list)
>>> my_list
[1, 2, 206]
>>> append_smth(my_list, value=10)
>>> my_list
[1, 2, 206, 10]
```

---

# Позиционные аргументы

<div></div>

- Значения аргументов зависят от их порядка
- Можно упаковать через `*`, чтобы передать произвольное количество аргументов. Тогда они все пойдут в `args` – неизменяемый кортеж

```python
>>> def max(first, *args):
...     m = first
...     for value in args:
...         m = value if value > m else m
...     return m
...  
>>> max(1, 2, 3)
3

>>> def f(*args):
...     print(type(args))
...  
>>> f()
<class 'tuple'>
```

---

# Именованные аргументы

- Если хотим уточнить, какой аргумент передаём, можем указать имя, тогда порядок становится неважен
- Некоторые аргументы можно сделать только именованными

```python
>>> print?
Signature: print(*args, sep=' ', end='\n', file=None, flush=False)
Docstring:
Prints the values to a stream, or to sys.stdout by default.

sep
  string inserted between values, default a space.
end
  string appended after the last value, default a newline.
file
  a file-like object (stream); defaults to the current sys.stdout.
flush
  whether to forcibly flush the stream.
Type:      builtin_function_or_method

>>> print("Hello", "world", end="!!", sep=", ")
Hello, world!!
```

---

# Именованные аргументы
<div></div>

Именованные аргументы тоже можно упаковывать, но уже через оператор `**`, тогда все именованные аргументы будут лежать в словаре `kwargs`

```python
>>> def print_date(**kwargs):
...     for key, value in kwargs.items():
...         print(f"{key:8} -- {value:4}")
...  

>>> print_date(day=20)
day      --   20

>>> print_date(day=20, month=8)
day      --   20
month    --    8

>>> print_date(day=20, month=8, year=2025)
day      --   20
month    --    8
year     -- 2025
```

---

# Области видимости
<br>

LEGB — правило поиска имени слева направо, local-enclosing-global-builtin

```python
>>> min                 # builtin
<function min>
>>> min = 42            # global
>>> def f(*args):
...     min = 2         # enclosing
...     def g():
...         min = 4     # local
...         print(min)
...
```

---

# Области видимости
<br>

Надо быть осторожным с присваиванием: алгоритм разрешения имён может поломаться

```python
>>> def h():
...     min += 1
...  

>>> h()
---------------------------------------------------------------------------
UnboundLocalError                         Traceback (most recent call last)
Cell In[66], line 1
----> 1 h()

Cell In[65], line 2, in h()
     1 def h():
----> 2     min += 1

UnboundLocalError: cannot access local variable 'min' where it is not associated with a value
```

---

# Функции высшего порядка

- Функции в питоне --- first class objects, то есть с ними можно работать как с любыми другими значениями
- Функции высшего порядка --- функции, которые принимают другую функцию как аргумент или возвращают другую функцию
- Примеры: `map`, `filter`, любой декоратор

```python
>>> numbers = list(map(int, input().split()))

>>> numbers
[1, 2, 3]
```

---

# $\lambda$-функции

- Лямбда-функции --- анонимные функции, которые объявляются в месте использования и не получают уникального идентификатора для доступа к ним
- Должны быть очень простыми (однострочными) возвращают результат выполнения своего тела (`return` не нужен)
- Всё, сказанное про функции, верно и для $\lambda$-функций

```python
>>> numbers = list(map(lambda x: int(x), input_string.split()))

>>> list(map(lambda x: x**2 if x % 2 == 0 else 0, numbers))
[0, 4, 0]
```

---

# Исключения
<br>

Если во время исполнения программы что-то пошло не так, то надо

- Как можно точнее понять, что именно пошло не так
- Отправить сообщение об ошибке в логи
- Попытаться продолжить работу, аккуратно обработав ошибку
- Если не получается, то выдать сообщение об ошибке пользователю. Ещё и так, чтобы он понял, что произошло

В общем, это отдельная большая работа, которую программисты должны уметь проводить

---

# Генерируем исключение

- С помощью ключевого слова `raise` можно кинуть исключение в любом месте программы
- `Exception` --- базовый класс для всех ошибок. Вообще, [встроенных ошибок](https://docs.python.org/3/library/exceptions.html#bltin-exceptions) довольно много

```python
>>> def fibonacсi(n):
...     if n < 0:
...         raise Exception("negative value")
...     elif n <= 1:
...         return n
...     ...

>>> fibonacсi(-4)
-------------------------------------------
Exception         Traceback (most recent call last)
Cell In[104], line 1
----> 1 fibonacсi(-4)
Cell In[100], line 3, in fibonacсi(n)
     1 def fibonacсi(n):
     2     if n < 0:
----> 3         raise Exception("negative value")
     4     elif n <= 1:
     5         return n

Exception: negative value
```

---

# Кастомные исключения

- Для создания своих исключений, нужно создать класс и отнаследоваться от `Exception`
- Изначально доступно всё, что есть в `Exception`, но в более сложных сценариях, нужно добавлять дополнительное поведение

```python
>>> class FibonacciNegative(Exception):
...     pass

>>> fibonacсi(-4)
--------------------------------------------------------
FibonacciNegative    Traceback (most recent call last)
Cell In[107], line 1
----> 1 fibonacсi(-4)

Cell In[106], line 3, in fibonacсi(n)
     1 def fibonacсi(n):
     2     if n < 0:
----> 3         raise FibonacciNegative("negative value")
     4     elif n <= 1:
     5         return n

FibonacciNegative: negative value
```

---

# `try`-`except`

- Обрабатывать исключения нужно через `try`-`except`
- Блок `finally` выполняется в любом случае


<div grid="~ cols-2 gap-4">

<div>

```python
def price_without_sale():
    try:
        price_with_sale = int(input())
        sale = int(input())
        if not 0 < sale < 100:
            raise Exception(f"Wrong sale = {sale}")
        return (price_with_sale * 100) / (100 - sale)
    except ValueError as e:
        print(e)
    except Exception as e:
        print(e)
    finally:
        print("finally")
```

</div>

<div>

```console
>>> price_without_sale()
a
invalid literal for int() with base 10: 'a'
finally

>>> price_without_sale()
90
101
Wrong sale = 101
finally
```

</div>

</div>

---

# Домашнее задание
<div></div>

- Напишите функцию [каррирования](https://en.wikipedia.org/wiki/Currying) (curry)
  - Принимает функцию от нескольких переменных $f : X_1 \times X_2 \dotsc \times X_n \to Y$, количество аргументов этой функции $n$
  - Возвращает функцию, от одной переменной, которая возвращает функцию от $n-1$ переменной: $f' : X_1 \to X_2 \to \dotsc \to X_n \to Y$
- Напишите обратную функцию к `curry` --- `uncurry`

Пример:

```python
def f(x, y, z):
    return x + y + z

f_curry = curry(f, 3)
print(f_curry(1)(2)(3)) # 6
```
