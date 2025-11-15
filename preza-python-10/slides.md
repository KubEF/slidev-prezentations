---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Python практика 9
info: |
  ## Практика по Python 9
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


# Практика по python 10
Некоторые полезные библиотеки для работы с файлами

---
layout: section
transition: slide-up

---

# Модуль [`pathlib`](https://docs.python.org/3/library/pathlib.html)

---
transition: slide-up

---

# Мотивация

`pathlib` — современный модуль Python для работы с файловыми путями

- Кросс-платформенность
- [ООП-api](https://peps.python.org/pep-0428/#why-an-object-oriented-api)

---

# Основы `pathlib`

```python
from pathlib import Path

path = Path('dir/file1.txt')
home_dir = path.home()                         # Домашняя директория
file_path1 = Path('data', 'file2.txt')         # Путь data/file1.txt
file_path2 = Path('data') / Path('file2.txt')  # Путь data/file2.txt


print(f"Текущая директория: {path.absolute()}")
```

<div grid="~ cols-2 gap-4">

<div>

```python
path.exists()      # проверка на существование пути
path.is_file()     # проверка, файл ли это
path.is_dir()      # проверка, директория ли это

# Информация
path.name          # file1.txt
path.stem          # file1 (имя без расширения)
path.suffix        # txt (расширение)
path.parent        # dir (родительская папка)
```

</div>

<div>

```python
# Чтение и запись
content = path.read_text(encoding='utf-8')
path.write_text('{"name": "John"}', encoding='utf-8')

# Создание директорий
new_dir = Path('data/results')
new_dir.mkdir(parents=True, exist_ok=True)

# Поиск файлов
json_files = list(Path('.').glob('*.json'))
all_files = list(Path('.').rglob('*'))  # рекурсивно
```

</div>

</div>

---
layout: section
transition: slide-up

---

# Формат [JSON](https://www.json.org/json-en.html)

JavaScript Object Notation

---
transition: slide-up

---

# Мотивация и синтаксис
<div></div>

<v-switch>
<template #0>

JSON — текстовый формат для обмена данными

## Зачем нужно

- [Сериализация и десериализация](https://en.wikipedia.org/wiki/Serialization)
- Обмен данными

</template>

<template #1>

## [Синтаксис](https://www.json.org/json-en.html)

<div grid="~ cols-2 gap-4">

<div>

- Формат ключ-значение
- Ключ может быть только строкой
- Значением может быть
  - Строка
  - Число
  - Массив
  - Запись --- неупорядоченное множество пар ключ-значение

</div>

<div>

```json
{
  "имя": "Иван",
  "возраст": 20,
  "оценки": [4, 5, 3, 5],
  "студент": true,
  "адрес": {
    "город": "Москва", 
    "улица": "Ленина"
  }
}
```

</div>
</div>
</template>
</v-switch>

---
transition: slide-up

---

# Работа с JSON в Python
<div></div>

[Модуль `json`](https://docs.python.org/3/library/json.html) встроен в Python

- `dump` и `dumps` --- преобразование объекта в json формат. `dump` записывает в файл, `dumps` возвращает как строку
- `load` и `loads` --- парсинг json-а в python объект. `load` читает из файла, `loads` преобразует переданную строку

```python
import json
from pathlib import Path

student = {"name": "Анна", "age": 19}

file_path = Path("student.json")

with file_path.open('w', encoding='utf-8') as f:
    json.dump(data, f)

with file_path.open('r', encoding='utf-8') as f:
    loaded_data = json.load(f)
```

---
transition: slide-up

---

# Чтение и запись JSON файлов

Сериализация и десериализация

<v-switch>

<template #0>

- Хотим сохранять какое-то состояние программы или какие-то данные
- Сохраним это в файлик, а потом подгрузим его

Если сериализуем что-то базовое, то проблем нет

```python
import json
from pathlib import Path

data = {"name": "Ann", "age": 19, "friends": [{"name": "Misha", "age": 20}]}

json_data = json.dumps(data)
print(json_data)

data_from_json = json.loads(json_data)
print(data_from_json)
```

</template>

<template #1>

Но что, если мы хотим сериализовать какие-то объекты классов?

``` python
class Person:
    def __init__(self, name, age):
        self.name: str = name
        self.age: int = age

    def celebrate_birthday(self):
        print("Happy birthday!!")
        self.age += 1

ann = Person("Ann", 19)

json_string = json.dumps(ann, indent=2)
```

</template>
</v-switch>

---

# Библиотеки для сериализации
<br>

Есть несколько способов: [marsmallow](https://marshmallow.readthedocs.io/en/latest/index.html), [pydantic](https://docs.pydantic.dev/latest/), [встроенный `JSONEncoder`](https://docs.python.org/3/library/json.html#json.JSONEncoder), ...

```python
from marshmallow import Schema, fields, post_load

class PersonSchema(Schema):
    name = fields.Str()
    age = fields.Int()

schema = PersonSchema() 

serialized = schema.dumps(ann)
print(serialized)

```

---
layout: section
transition: slide-up

---

# Формат CSV

Comma-Separated Values

---
transition: slide-up

---

# Мотивация
Таблички

[CSV](https://ru.wikipedia.org/wiki/CSV) --- текстовый формат для табличных данных

- Самый простой способ хранения и обработки табличных данных
- Каждая строка --- это одна строка таблицы, которая разделяется запятой

```csv
name,  age, group
Иван,  18,  Б25-43
Мария, 19,  Б25-43
Петр,  17,  Б25-43
```

---

# Чтение и запись CSV файлов

[Модуль `csv`](https://docs.python.org/3/library/csv.html) встроен в Python

<v-switch>

<template #0>

## Чтение

```python
import csv
from pathlib import Path

file_path = Path("students.csv")

with file_path.open('r', encoding='utf-8') as f:
    reader = csv.DictReader(f)  # Читаем как словари
    
    for row in reader:
        print(f"Студент: {row['name']}, "
              f"Возраст: {row['age']}, "
              f"Группа:  {row['group']}")
```

</template>

<template #1>

## Запись

```python
import csv
from pathlib import Path

students = [
    {"name": "Иван",  "age": "18", "group": "25Б-43"},
    {"name": "Мария", "age": "19", "group": "25Б-43"},
    {"name": "Петр",  "age": "17", "group": "25Б-43"}
]

file_path = Path("students.csv")

with file_path.open('w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age", "group"])
    writer.writeheader()        # Записываем заголовки
    writer.writerows(students)  # Записываем данные
```

</template>

</v-switch>

---
layout: section
transition: slide-up

---

# [Генераторы](https://peps.python.org/pep-0255/)

---
transition: slide-up

---

# Мотивация, основы
<br>

- Хотим выдавать значения по ходу выполнения функции (например, парсим большой кусок кода и интерпретируем его)
- Для этого нужен разделяемый стейт: либо делаем его глобальным, либо явно передаём его каждый раз как аргумент
- Но можно вшить стейт в функцию, которая даёт следующее значение только когда попросят

```python
def fib():
    a, b = 0, 1
    while True:
       yield b
       a, b = b, a + b

fib_gen = fib()
print(next(fib_gen)) # 1
print(next(fib_gen)) # 1
print(next(fib_gen)) # 2
```

---
transition: slide-up

---

# [Передача параметров](https://docs.python.org/2/reference/expressions.html#yield-expressions)
<br>

- Иногда хочется передать в функцию дополнительные параметры, чтобы её поведение менялось
- Но мы уже вызвали функцию с какими-то аргументами, как передать какие-то ещё?

```python
def g(n):
    count = n * 2
    while count > 0:
        v = yield count
        count -= 1
        if v is not None:
            count += v

next(a)    # 10
next(a)    # 9
a.send(10) # 18
next(a)    # 17
```

---
transition: slide-up

---

# [Делегирование подгенераторам](https://peps.python.org/pep-0380/)
<br>

- Хотим использовать генераторы в других генераторах
- Но если начать напрямую их вкладывать, то это значительно поднимет сложность
- Сам заботится о том, чтобы правильно передать `send`, `close`, `throw`

```python

def flatten(iterable):
    for item in iterable:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)
        else:
            yield item

```
