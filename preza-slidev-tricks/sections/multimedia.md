---
layout: section
transition: slide-up
level: 1
---

# Мультимедиа

---
level: 2
---

# python-runner: запуск Python в браузере

Блок `{monaco-run}` исполняет код через Pyodide прямо на слайде

```python {monaco-run}
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([fib(i) for i in range(10)])
```

- Подключается аддоном `slidev-addon-python-runner` в `addons:`
- Настройка — через блок `python:` в frontmatter (installs, prelude, ...)
- Язык раннера: `python` или `py`

> Установлен в `package.json` репозитория и во всех презах через `addons:`. Демо-кнопка «Run» появляется на блоке.

---
level: 2
---

# Manim: анимации графов → mp4

Анимации рисуем в Manim, рендерим в видео, кладём в `public/`

```python
from manim import *
import networkx as nx

class AnimatedCyclicGraph(Scene):
    def construct(self):
        G = nx.cycle_graph(5)
        graph = Graph(
            list(G.nodes), list(G.edges),
            edge_type=Arrow, layout="shell", labels=True,
            vertex_config={"color": BLACK, "radius": 0.3},
            edge_config={"color": BLACK},
        )
        self.camera.background_color = WHITE
        self.add(graph)
        for edge in [(0,1),(1,2),(2,3),(3,4)]:
            self.play(graph.edges[edge].animate.set_color(RED), run_time=0.5)
```

> `preza-python-11/graph-manim/main.py` → `dfs-animation.mp4`, `CompactDFS.mp4` в `public/`. Дальше вставляется `<SlidevVideo>`.
