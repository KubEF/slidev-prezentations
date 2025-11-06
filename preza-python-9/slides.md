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

# Практика по Python 7

Работа с файлами, контекстный менеджер

---

# Менеджер контекста
<br>

- «[Контекстные менеджеры](https://peps.python.org/pep-0343/) в Python — это удивительный механизм, который позволяет гарантировать корректное управление ресурсами и обеспечивать безопасное выполнение кода.» — Гвидо ван Россум
- Хотим "захватить" некоторый "ресурс", а потом, после работы с ним, "освободить"
  - "захватить", "освободить" и "ресурс" здесь употребляется в очень широком смысле
  - Может быть файлом, объектом в многопоточном программировании, базой данных, любым иным контекстом (например, рабочей директорией)

---

# Пример работы с файлом через `with`
<br>

- Захватываем какой-то ресурс через `with func() as resource:`
- Работаем с ним, а после он сам *магическим* образом освобождается. В данном случае просто закрывает файл

````md magic-move

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

---

# Как написать свой контекстный менеджер
<br>

Для написания своего контекстного менеджера есть два пути: через [декоратор](https://docs.python.org/3/glossary.html#term-decorator) или через реализацию [магических методов](https://docs.python.org/3/glossary.html#term-special-method)

С декоратором просто, но что за `yield`? [Читаем PEP](https://peps.python.org/pep-0343/#generator-decorator), чтобы понять

```python

@contextmanager
def opening(filename):
    f = open(filename)
    try:
        yield f
    finally:
        f.close()

```

---

# Лирическое отступление про классы и [магические методы](https://docs.python.org/3/glossary.html#term-special-method) в питоне
<div></div>

- Не будем сейчас говорить про ООП
- Но можете почитать документацию про [классы](https://docs.python.org/3/tutorial/classes.html)
- Будем пользоваться ими почти как структурами в C с возможностью писать методы

```python

class MyClass:
    def __init__(self, x, y):
        self.my_field1 = x
        self.my_field2 = y
    
    def my_method(self, input):
        pass
    
    def __eq__(self, y: MyClass) -> bool:
        pass 


x = MyClass(1, 2)
x.my_method("some input string")
y = MyClass(3, 4)
print(x == y)
```

---

# Как написать свой контекстный менеджер (2)
<div></div>

Подробности смотрим в [PEP](https://peps.python.org/pep-0343/#specification-the-with-statement)

<div grid="~ cols-2 gap-4">

<div>

```python

class Opening:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_value, traceback): 
        self.file.close()
```

</div>

<div>

```python

mgr = Opening(filename, mode)
value = mgr.__enter__()
exc = True
try:
    try:
        VAR = value  # Only if "as VAR" is present
        #some actions
    except:
        # The exceptional case is handled here
        exc = False
        if not mgr.__exit__(*sys.exc_info()):
            raise
finally:
    if exc:
        mgr.__exit__(None, None, None)
```

</div>

</div>


---

# Ещё контекстные менеджеры
Смотрим [примеры](https://peps.python.org/pep-0343/#examples)

- `locked` для захвата ресурса и его последующем освобождении при параллельном программировании
- `db.connect` для соединения с базой данных
- `transaction` для обеспечения целостности транзакций при работе с БД
- `tempfile` для работы с временным файлом, который после работы надо удалить
- `os.cd` для временного вхождения в директорию

---

# Работа с файлами
Уже знакомый [`open`](https://docs.python.org/3/library/functions.html#open)

<v-switch>

<template #0>

- `r` открытие файла для чтения
- `w` открытие файла для записи, удаляет содержимое
- `a` открытие файла для записи, не удаляет содержимое
- `x` обязательно создаёт новый файл, если файл уже есть, то упадёт с ошибкой
- `t`, `b` соответственно, текстовый и бинарный режимы работы с файлами
- `+` открывает файл и для чтения, и для записи

</template>

<template #1>

Можем читать и писать через соответствующие функции

- `read(n)` прочитать `n` символов/байт из файла. Если не указать `n`, то прочитает весь файл
- `readline(n)` прочитать максимум `n` символов строки. По умолчанию читает все символы до конца строки
- `readlines()` прочитать все строки, возвращает список строк
- `write(data)` записать данные (текстовые или бинарные) в файл
- `writelines(datalines)` записать список данных в файл
</template>

</v-switch>

---

# Хаффман

- Реализуем [код Хаффмана](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4_%D0%A5%D0%B0%D1%84%D1%84%D0%BC%D0%B0%D0%BD%D0%B0)
- Нужно сделать и сжатие, и разжатие
- Сначала делаем функции, которые работают со строками
- Потом делаем функции, которые работают с файлом (переиспользуя реализованные функции)
