---
layout: section
transition: slide-up
level: 1
---

# Layouts

---
level: 2
---

# Layout: default

Обычный слайд — заголовок + контент

<div grid="~ cols-2 gap-4">
<div>

- Никакого `layout` в frontmatter — тема `seriph` рисует сама
- Заголовок `#` сверху
- Дальше любой markdown/HTML

</div>

<center>
<div class="grid place-items-center h-full">
<img src="/branches.svg" style="width:90%; height:auto;">
</div>
</center>
</div>

> `preza-python-3`: «Ветки» — обычный слайд с контентом слева и картинкой справа через грид.

---
layout: full
level: 2
---

# Layout: full

Контент на весь слайд, без боковых полей

<div grid="~ cols-2 gap-4">
<div>
<Toc columns="1" maxDepth="2"/>
</div>

<div class="grid place-items-center h-full">
<img src="https://raw.githubusercontent.com/louim/in-case-of-fire/refs/heads/master/in_case_of_fire.png">
</div>
</div>

> `preza-python-2`: содержание на весь слайд + картинка. `grid place-items-center h-full` центрирует картинку по вертикали и горизонтали.

---
layout: image-right
image: /branches.svg
backgroundSize: 80%
level: 2
---

# Layout: image-right

Картинка справа, контент слева

- В frontmatter: `layout: image-right`, `image:`, `backgroundSize:`
- Картинка — фон правой половины
- Контент пишется как обычно

<br>

> `preza-python-3` «Ветки», `preza-descrete-1` «Представлюсь» (там `image: /qrCode.png`).


---
layout: two-cols-header
level: 2
---

# Layout: two-cols-header

Заголовок сверху, две колонки снизу

<br>

- Первая колонка
- Контент слева

::right::

- Вторая колонка
- Контент справа

> `preza-python-6` «Виды тестов». Разделитель колонок — маркер `::right::`.

---
level: 2
---

# Гриды: базовый

Двухколоночный макет через UnoCSS

```html
<div grid="~ cols-2 gap-4">
  <div>левая колонка</div>
  <div>правая колонка</div>
</div>
```

<div grid="~ cols-2 gap-4">
<div>

- `grid="~ cols-2 gap-4"` — 2 равные колонки
- Внутри можно гриды вкладывать

</div>
<div>

- `cols-[1.5fr_1fr]` — пропорциональные колонки
- `cols-[2fr_3fr]`, `cols-[1.2fr_2fr]` и т.д.

</div>
</div>

> Самый частый приём: почти каждый слайд в `preza-python-*` использует такой грид. Пропорции — через `cols-[...]`.

---
level: 2
---

# Гриды: код рядом с текстом

`grid="~ cols-[2fr_3fr] gap-4"` — код и объяснение

<div grid="~ cols-[2fr_3fr] gap-4">

<div>

```python
@contextmanager
def opening(filename):
    f = open(filename)
    try:
        yield f
    finally:
        f.close()
```

</div>

<div>

- Слева код, справа пояснение
- Ширины 2:3 — код уже текста
- Внутри колонок можно `<v-click>` и прочее

</div>
</div>

> `preza-python-9` «Контекстный менеджер», `preza-python-6` «Фикстуры».

---
level: 2
---

# Центрирование: `<center>` и `<div>`

<center>

<img src="/hash_table.svg" style="width:40%; height:auto;">

</center>

<br>

- `<center>` — центрирование картинок, таблиц
- `<div class="grid place-items-center h-full">` — центрирование внутри колонки грида
- UnoCSS-классы на стилях: `style="width:40%; height:auto;"` + `m-t="5"`

> `preza-python-12` (hash-таблицы), `preza-python-1` (QR), `preza-python-3` (merge/rebase). `m-t="5"` — margin-top от UnoCSS.

---
level: 2
---

# Спейсеры: `<div></div>` и `<br>`

Заголовки в `seriph` жмутся к контенту — добавляем пустое место

```html
# Заголовок
<div></div>   <!-- тянет контент вниз -->
```
```html
# Заголовок
<br>
```

- `<div></div>` после заголовка — пустой блок-распорка
- `<br>` — перенос строки

> Спейсер `<div></div>` встречается на десятках слайдов (`preza-python-3`, `-6`, `-7`, `-9`, `-12`). Дешёвый способ разгрузить верх.
