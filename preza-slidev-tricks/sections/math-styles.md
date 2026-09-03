---
layout: section
transition: slide-up
level: 1
---

# Математика и стили

---
level: 2
---

# Математика (KaTeX)

Формулы на любом слайде

Инлайн: `$t(n) \in O(g(n))$` и блочная формула:

$$
t(n) \in O(g(n)) \Leftrightarrow \exists C > 0: \exists n_0 > 0 : \forall n > n_0 : |t(n)| \leq C\cdot |g(n)|
$$

<div grid="~ cols-2 gap-4">
<div>

- `$...$` — инлайн-формула
- `$$...$$` — отдельным блоком
- `\frac`, `\sum`, `\mathbb{R}`, `\varnothing`

</div>
<div>

- $\mathbb{N}$, $\mathbb{R}$, $\mathbb{U}$ — жирные множества
- $\varnothing$ — пустое множество
- $A \cup B$, $A \cap B$, $A \setminus B$, $A \Delta B$

</div>
</div>

> `preza-descrete-1` (множества, отношения, индукция) и `preza-python-4` (O-нотация) полностью на KaTeX.

---
level: 2
---

# Стилизация таблиц: `<style>` в слайде

Локальный CSS прямо в слайде

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

| %      | ECTS |
|:-----:|:---:|
| 92-100|  A  |
| 84-91 |  B  |
| 76-83 |  C  |

> `preza-python-1` «Критерии оценивания», `preza-python-2` «Python2 и Python3». Стили применяются к таблицам всего слайда.

---
level: 2
---

# Инлайн-стили и UnoCSS-классы

<span color="red">Цветной</span> текст и утилиты

<div grid="~ cols-2 gap-4">
<div>

- `<span color="red">текст</span>` — цвет текста
- `<span v-mark.red>` — подсветка (см. раздел 3)
- `class="text-3xl"` — размер
- `m-t="5"`, `m-x="4"` — отступы

</div>
<div>

- `style="width:50%; height:auto;"` — размер картинок
- `style="color:#069494;"` — свой цвет
- `<u>подчёркнуто</u>` — текст

</div>
</div>

<center>

<span style="color:#069494; font-size:2rem;">teal = primary</span>

</center>

> `preza-python-6` «Уровни тестирования» (`<span color="red/green">`), `preza-python-1` и др. для размеров картинок.

---
level: 2
---

# Картинки: локальные vs удалённые

Оба способа рабочие
<br>
<div grid="~ cols-2 gap-4">
<div>

**Локальные** — `public/`

```md
<img src="/hash_table.svg">
```

Путь с `/` → файл из `public/`. Так лежат все схемы: `commit-scheme.svg`, `branches.svg`, `merge.svg`, `rebase.svg`, `qrCode.png`, gif.

</div>
<div>

**Удалённые** — полный URL

```md
<img src="https://git-scm.com/images/branching-illustration@2x.png">
```

Классика: `git-scm.com/images/...`, `raw.githubusercontent.com/...`.

</div>
</div>

<center>
<img src="/hash_table.svg" style="width:25%; height:auto;">
</center>

> Локальные SVG-схемы рисовали руками под тему (`preza-python-12`, `preza-python-3`). Удалённые — `preza-python-2` (git-scm) и др.
