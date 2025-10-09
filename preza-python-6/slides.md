---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Python практика 6
info: |
  ## Практика по Python 6
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

# Практика по Python 6

Тестирование и основы pytest

---

# Мотивация

<br>

- Любая программа содержит ошибки
- Если программа не содержит ошибок, их содержит алгоритм, который реализует эта программа
- Если ни программа, ни алгоритм ошибок не содержат, такая программа даром никому не нужна

Ошибки есть всегда, но надо минимизировать их количество и влияние

Почему? Потому что некоторые ошибки очень дорогие (а иногда вообще могут быть причиной смерти)

---
layout: image

image: public/chronology.svg

---

# [Хронология ошибок](https://docs.google.com/presentation/d/1evt9nF5N27Fs24cEGOXQJd3AfNfd-l3k0kglrY71NLA/edit#slide=id.p)

---
layout: two-cols-header

---

# Виды тестов

<br>

- Функциональные: направлены на проверку функциональности программы
- Нефункциональные: Проверяют иные важные свойства программы
  - Производительность
  - Безопасность
  - Удобство использования
  - ...

---
layout: image-right

image: "https://www.twilio.com/content/dam/twilio-com/global/en/blog/legacy/2022/unit-integration-end-to-end-testing-difference/1pafGbI1FKxvy_xUcTOiEruKNtMWadUCAI_v47hYnsrWgj_u2wW6H3eMen1LT8zTHfN2sbrDDP_7_DmABwjo.png"

backgroundSize: contain

---

# Уровни тестирования

<div></div>

<span color="red">Выше</span> – сложнее и дороже

<span color="green">Ниже</span> – быстрее и проще

- Unit – тестирование отдельных компонентов
- Integration – тестирование взаимодействия компонентов
- E2e (end-to-end) – тестирование системы в целом

Можно придумать еще больше уровней, это, как и все в программировании просто один из вариантов

---

# Unit тесты

<br>

- Проверяют одну компоненту
- Должны быть быстрыми
- Должны проверять разные, особенно краевые, случаи
- Их должно быть много
- Запускаются при каждом изменении кода $\Rightarrow$ помогают при рефакторинге
- Являются отличной документацией
- Помогают улучшить архитектуру
- НЕ доказывают отсутствие ошибок в программе

---

# Библиотеки для тестирования

А что с питоном?

- [unittest](https://docs.python.org/3/library/unittest.html)
- [pytest](https://docs.pytest.org/en/latest/index.html)
- куча вспомогательных библиотек: doctest, flake8, mock, pylama, tox, …

По факту сейчас доминирует pytest, но unittest может много где встретиться, так что знать про него чуть-чуть надо

---

# Pytest. Основы

<div></div>

<div grid="~ cols-2 gap-4">

<div>

- Ставим, как любой другой пакет, через pip
- Тестами считаются функции с названиями `test_*` и `*_test`.
- Можно засунуть в класс с названием `Test*`
- Проверяем через `assert`

</div>

<div>

```python [tests/my_sqr.py]
from src.my_sqr import my_sqr


def test_sqr_positive():
   assert my_sqr(2) == 4


def test_sqr_negative():
   assert my_sqr(-3) == 9


def test_sqr_zero():
   assert my_sqr(0) == 0
```

</div>
</div>

---

# Pytest. Параметризация

<br>

Параметры – именованные входные данные для конкретного теста, которые можно
использовать внутри тела функции как поле

- Реализуется через декораторы
- Тест перезапускается для всех данных из параметров

```python

@pytest.mark.parametrize(
    ["n", "expected"], [(1, 1), (2, 1), (3, 2), (4, 3), (5, 5), (6, 8)]
)
def test_fib_main(n, expected):
    assert fib(n) == expected
```

---

# Pytest. Фикстуры

<br>

[Фикстура](https://docs.pytest.org/en/latest/explanation/fixtures.html) – функция, которая «подготавливает» контекст для тестов, будь то данные или среда (например, база данных)

- Реализуется с помощью декораторов
- Имеет разные области видимости (функция, класс, модуль, … )
- Может быть параметризована
- Может быть применена ко всем тестам, даже если они этого не просили

<div grid="~ cols-[2fr_3fr] gap-4">

<div>

```python [tests/conftest.py]
import pytest
import random

@pytest.fixture
def random_n():
    random_n = random.randint(100, 1000)
    return random_n
```

</div>

<div>

```python [tests/fib.py]
from src.fib import fib
from conftest import random_n  # noqa: F401
import pytest

def test_fib_random(random_n):  # noqa: F811
    assert fib(random_n - 2) + fib(random_n - 1) == fib(random_n)

```

</div>
</div>

---

# Pytest. Ещё вкусное

<br>

- Можно работать с исключительными ситуациями: [skipif](https://docs.pytest.org/en/latest/reference/reference.html#pytest.mark.skip), [xfail](https://docs.pytest.org/en/latest/reference/reference.html#pytest.mark.xfail), [raises](https://docs.pytest.org/en/latest/reference/reference.html#pytest.mark.xfail)
- Можно использовать плагины
- Можно конфигурировать pytest для поведения по умолчанию (и вообще использовать разные флаги для упрощения жизни)


---

# Домашнее задание

1. Написать сортировку кучей и тесты к ней
    - обычные unit тесты
    - крайние случаи
    - property based тесты с другими реализованными сортировками
2. Настроить запуск тестов в CI
