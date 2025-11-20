---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Python практика 11
info: |
  ## Практика по Python 11
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


# Практика по python 11
Итераторы и интерфейсы

---

# Семантика цикла `for`
<br>

В python `for` скорее похож на `foreach` в других языках программирования

```python
for x in xs:
    do_something(x)
```

Делает что-то такое

```python
it = iter(xs)
while True:
    try:
        x = next(it)
    except StopIteration:
        break
    do_something(x)
```

---

# [Протокол итератора](https://peps.python.org/pep-0234/)
`__iter__` и `__next__`

- Есть какой-то объект, хотим его как-то обходить
- `__iter__` возвращает объект, по которому итерируемся
  - Если есть, можем вызывать `iter(obj)`
  - Очень часто возвращает просто `self`
  - Если есть, то объект "реализует интерфейс Iterable"
- `__next__` возвращает элемент объекта, который обходим
  - Если есть, можем вызывать `next(iterator)`
  - В конце поднимает исключение `StopIteration`
  - После конца на каждый последующий вызов `next` поднимает `StopIteration`
  - Если есть, то объект "реализует интерфейс Iterator" (или просто называется итератором)

---

# Протокол итератора: пример

```python {1-4|6-7|9-14|16-19|21|all}{lines:true}
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

it = Squares(5)

for i in it:
    print(i) 

list(it)
```

---

# [Модуль `itertools`](https://docs.python.org/3/library/itertools.html)
Работа с коллекциями

- Бесконечные последовательности: `count`, `cycle`, `repeat`
- Обход с эффектами, группировки, конкатенация, и тд: `accumulate`, `groupby`, `chain`, `dropwhile` и тд
- Комбинаторика: `product`, `permutation`, `combinations`  

---

# Протоколы, duck-typing
"Если это выглядит как утка и крякает как утка, значит это утка"

- Динамический язык, поэтому не можем строго следить за тем реализацией интерфейсов (протоколов)
- Вызываем соответствующие методы, а если их нет, то получаем ошибку в рантайме
  - Современные подвижки в сторону более серьёзной типизации [есть](https://github.com/python/mypy)
- Есть много [встроенных протоколов](https://docs.python.org/3/reference/datamodel.html#special-method-names)
  - `__len__` длина (в каком бы то ни было смысле) объекта
  - `__str__` как показывать объект, например при `print`
  - `__eq__` перегрузка оператора сравнения `==`. Есть и остальные операторы
  - `__add__` перегрузка оператора сложения `+`. Есть и остальные операторы
  - `__hash__` hash объекта $\Rightarrow$ можем использовать как ключ в `dict` или элемент в `set`
  - ...

---

# Интерфейсы
<div></div>

Такие вещи в статически типизированных языках сделать не получится

```python {1-9|10-13|14-15|17-18|all}
class CoolClass:
    ...
    
    def cool_method(self):
        pass

class NotCoolClass:
    pass

def cool_function(obj):
    ...
    obj.cool_method()

cool_o = CoolClass()
cool_function(cool_o)     # всё хорошо

not_cool_o = NotCoolClass()
cool_function(not_cool_o) # ошибка в рантайме

```

---

# Интерфейсы в других языках
<br>

<v-switch>

<template #0>

Kotlin

```kotlin
interface Show {
    fun show(): String
}

fun getString(obj: Show): String = "this is string " + obj.show()

```

</template>

<template #1>

Rust

```rust
trait Show {
    fn show(&self) -> String;
}

fn get_string<T: Show>(obj: &T) -> String {
    format!("this is string {}", obj.show())
}

```

</template>

<template #2>

Haskell

```haskell
class Show a where
  show :: a -> String

getString :: Show a => a -> String
getString = "this is string " ++ show a
```

</template>

<template #3>

И даже на Python по итогу можно

```python
from abc import ABC, abstractmethod

class Show(ABC):
    @abstractmethod
    def show(self) -> str:
        pass

def get_string(obj: Show) -> str:
    return "this is string " + obj.show()
```

</template>

</v-switch>

---

# Графы
Отступление на определение

- Множество вершин $V$
- Множество рёбер $E = V\times V$. Если порядок (в паре) важен, то направленный, если не важен, то ненаправленный
- Метки на вершинах или на рёбрах
  - $\Sigma$ --- символы (или что-то другое, например, веса)
  - $label: V \to \Sigma$ --- метки
  - Может вообще не быть, тогда граф называется непомеченным

Непомеченный граф --- это просто пара $(V, E)$

---

# Обход графа в глубину
Deep-First-Search

<div grid="~ cols-2 gap-4">

<div>

- Сначала все вершины непосещённые (обычно белые, но тут <span style="color:#069494;">teal</span>)
- Идём по всем вершинам `v`: если она белая, то идём в неё `DFS_step(v)`
- `DFS_step(u)`
  - Помечаем вершину как посещённую (серым)
  - Кладём её в аккумулятор (или, например, принтим)  
  - Для всех белых соседей `u` (обозначим их за `w`) выполняем `DFS_step(w)`
  - Помечаем `u` как отработанную (чёрным)

</div>

<div>
<SlidevVideo v-click autoplay controls autoreset='click'>
  <!-- Anything that can go in an HTML video element. -->
  <source src="/dfs-animation.mp4" type="video/mp4" />
</SlidevVideo>
</div>

</div>