---
theme: seriph
themeConfig:
  primary: '#069494'
background: https://cover.sli.dev
title: Рассказ про Clash
info: |
  ## Рассказ про Clash
drawings:
  persist: false
transition: slide-left
mdc: true
seoMeta:
  ogImage: https://cover.sli.dev
fonts:
  sans: Robot
  mono: JetBrains Mono
favicon: https://clash-lang.org/media/logos/icon_dark.svg
hideInToc: true
---

# Рассказ про Clash


---

# Что такое Clash
<br>

Clash --- это HDL на основе Haskell, позволяющий проводить симуляцию и компилировать код в традиционные HDL (VHDL, Verilog, SystemVerilog).

---

# Преимущества, которые даёт Haskell
<br>

- Можно использовать (почти) всю мощь системы типов
  - compile-time проверки
  - eDSL для реализации своей логики
  - Ограничения на уровне типов $\Rightarrow$ сложнее выстрелить себе в ногу
- Инфраструктура Haskell
  - Прямо на уровне дизайна: трансформеры монад, линзы, ...
  - На уровне тестирования, пред- и пост- обработки данных: почти всё
- REPL


---

# Небольшое напоминание про Haskell

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b
  -- или инфиксная запись <$>


class Functor f => Applicative f where
  pure :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b
```
---

# Простой пример
<br>

- Комбинационная логика --- (почти) обычный Haskell

```haskell
ma :: Unsigned 8 -> (Unsigned 8, Unsigned 8) -> Unsigned 8 
ma acc (x,y) = acc + x * y
```

- Последовательностная реализуется через обёрткой аппликативным функтором `Signal dom`

```haskell

macA
  :: HiddenClockResetEnable dom 
  => Signal dom (Unsigned 8, Unsigned 8) 
  -> Signal dom (Unsigned 8)
macA xy = acc
  where
    acc  = register 0 acc'
    acc' = ma <$> acc <*> xy
```

---

# Как оно компилируется
<br>

Clash --- диалект Haskell, подменяет стандартную библиотеку, но все основные конструкции можно использовать.

- Компилятор Clash основан на GHC
- Внутреннее представление GHC core аннотируется информацией для синтеза
- Все функции высших порядков и рекурсивные функции разворачиваются, устраняется полиморфизм


---

# Как оно симулируется
<br>

- Почти всё --- простой код на Haskell $\Rightarrow$ используем GHC
- С комбинационной логикой посложнее
  - Если один домен, то представляем сигнал как список значений
  - Если несколько, то создаются виртуальные тактовые генераторы


---

# Автоматные абстракции
<br>

- Автомат Мили

```haskell
mealy
  :: HiddenClockResetEnable dom
  => (s -> i -> (s,o))
  -> s
  -> (Signal dom i -> Signal dom o)

```

- Автомат Мура

```haskell
moore
  :: HiddenClockResetEnable dom
  => (s -> i -> s)
  -> (s -> o)
  -> s
  -> (Signal dom i -> Signal dom o)
```

- Есть версии с использованием `State` монады

---

# Пример посложнее
<div></div>


````md magic-move

```haskell {1-7|1,9-45}{lines:true}
module Blinker where

import Clash.Prelude
import Clash.Annotations.TH
import Control.Monad.State
import Data.Tuple
import Ice40.Clock ( Lattice12Mhz )

type Byte = BitVector 8

type Rgb = (
    "red"   ::: Bit
  , "green" ::: Bit
  , "blue"  ::: Bit
  )

data Color = Red | Green | Blue
  deriving (NFDataX, Generic, Enum)

data Blinker =  Blinker Color (Byte, Byte, Byte) (Index 24000000)
  deriving (NFDataX, Generic)
...
```

```haskell {1-6|8-10}{lines:true}
...

drive :: Color -> (Byte, Byte, Byte)
drive Red   = (0xFF, 0,    0)
drive Green = (0,    0xFF, 0)
drive Blue  = (0,    0,    0xFF)

pwm :: Byte -> Byte -> Bit
pwm p1 p2 = boolToBit (p1 < p2)
...
```

```haskell {*|2-3,4,9,10-13|5|6-7|8,14-17|9|10-13|*}{lines:true}
...
blinker :: State Blinker Rgb
blinker = do
  Blinker color (pwmRed, pwmGreen, pwmBlue) timer <- get
  let (drvRed, drvGreen, drvBlue) = drive color
      done   = timer == maxBound -- 2 seconds
      timer' = if done then 0 else t + 1
      color' = nextColor done color
  put $ Blinker color' (pwmRed + 1, pwmGreen + 1, pwmBlue + 1) timer'
  return (
      pwm pwmRed drvRed
    , pwm pwmGreen drvGreen
    , pwm pwmBlue drvBlue)
  where
    nextColor True  Blue     = Red
    nextColor True  color    = succ color
    nextColor False color    = color
...
```

```haskell {*|8|2-6,8-9|3,10|4,11,13-14|5,12|*}{lines:true}
...
mealyS :: HiddenClockResetEnable dom =>
  (i -> State s o) 
  -> s 
  -> Signal dom i 
  -> Signal dom o

blinkerMealy :: HiddenClockResetEnable dom => Signal dom Rgb
blinkerMealy = mealyS 
  (\_ ->  blinker)
  blinkerInit
  (pure ())
  where
    blinkerInit = Blinker Red (0, 0, 0) 0
...
```

```haskell
...
{-# NOINLINE topEntity #-}
topEntity
  :: "clk" ::: Clock Lattice12Mhz
  -> "rst" ::: Reset Lattice12MHz
  -> "led" ::: Signal Lattice12Mhz Rgb
topEntity clk rst = withClockResetEnable clk rst enableGen blinkerMealy

makeTopEntityWithName 'topEntity "Blinker"    

```


````

---

# Тестирование
<br>

- Можно писать обычные тесты
  - сигналы можно "хардкодить" из списков: `fromList [1,2,3,4,5]` в зависимости от домена будет сигналом, который по такту меняет значения `[1, 2, 3, 4, 5]`
  - используем привычные библиотеки: Hedgehog, UnitTest
- Можно писать тестбенчи, транслирующиеся в SystemVerilog (или VHDL, или Verilog)

---

# Источники

- [Документация](https://clash-lang.org/documentation/)
- [Туториал](https://hackage-content.haskell.org/package/clash-prelude-1.8.2/docs/Clash-Tutorial.html)
- Книга ["Retrocomputing with Clash"](https://unsafeperform.io/retroclash/) (на сайте есть ссылки на примеры кода)
- Код [Blinker](https://github.com/standardsemiconductor/VELDT-blinker-clash/tree/main)
