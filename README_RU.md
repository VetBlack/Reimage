# Reimage

<p align="center">
 <img alt="issues" src="https://img.shields.io/github/license/VetBlack/Reimage" />
 <img alt="issues" src="https://img.shields.io/github/languages/top/Vetblack/Reimage" />
 <img alt="issues" src="https://img.shields.io/snyk/vulnerabilities/npm/reimage" />
 <img alt="issues" src="https://img.shields.io/bundlephobia/min/reimage" />
 <img alt="issues" src="https://img.shields.io/github/stars/VetBlack/Reimage" />
 <img alt="issues" src="https://img.shields.io/github/forks/VetBlack/Reimage" />
 <img alt="issues" src="https://img.shields.io/github/issues/VetBlack/Reimage" />
 <img alt="issues" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FVetBlack%2FReimage" />
</p>

**Reimage** это React библиотека для комфортной работы с изображениями и улучшения UX в ваших проектах. Если в вашем проекте используются изображения то **Reimage** это все что вам нужно для работы с ними. **Reimage** предлагает следующий список возможностей:

- Ленивая загрузка изображений,
- Настраиваемый порог загрузки изображения,
- Обработка сломанных изображений,
- Спиннеры и компоненты загрузки,
- Стилизация и кастомизация, 

**Reimage** может использоваться отдельно или же со сторонними галереями и слайдерами. 

>**Внимание:** Intersection observer API используется в **Reimage** проверьте поддерживают ли его [ваши целевые браузеры](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility) 

## Установка

1. Для установки `reimage` используйте:

**npm**

```
npm install reimage --save
```
**yarn**

```
yarn add reimage
```

## Документация

Чтобы использовать `Reimage` в вашем проекте используйте:

```
import Reimage from 'reimage';

или

const Reimage = require('reimage');

```
Пример:
```
import React from 'react'
import Reimage from 'reimage';

export default function Example() {
  return (
    <Reimage
    src={url}
    width={400}
    height={500}
    alt="oops"
  />
  )
}
  
```

## Демо

Демо можно найти [здесь](https://codesandbox.io/s/hardcore-flower-l7kjp?file=/src/App.js)

## Рецепты

**Подложка с размытым изображением во время загрузки**

Чтобы во время загрузки показывать размытое изображение (как на Медиум например), вы должны заранее создать минифицированную копию изображения и добавить в параметр ```minifiedSrc```

```
import React from 'react'
import Reimage from 'reimage';
import * as minifiedImage from './path/to/minified;' // importing minified image

export default function Blured() {
  return (
    <Reimage
    crossOrigin='anonymous'
    src={src}                          // can be url or imported image
    width={400}
    height={500}
    minifiedSrc={minifiedTest}         // pass minifiedImage to component            
    alt="oops"
    classNames="ClassName1, ClassName2, ClassNameN"
    wrapper="div"
    wrapperClass="customWrapperClassName"
  />
  )
}
  
```

**Цветной фон во время загрузки изображения**

Чтобы сделать цветной фон во время загрузки изображения, просто передайте цвет в параметр ```backDropColor```.

```
import React from 'react'
import Reimage from 'reimage';

export default function BackdropColored() {
  return (
    <Reimage
    crossOrigin='anonymous'
    src={src}
    width={400}
    height={500}
    alt="oops"
    classNames="ClassName1, ClassName2, ClassNameN"
    wrapper="div"
    wrapperClass="customWrapperClassName"
    backDropColor='#e3e3e3'      
  />
  )
}
  
```

**Обработка ошибок во время загрузки изображения**

Если ваше изображение не загрузилось по какойто причине вы можете обработать ошибку несколькими путями:

1) Указать ```errorImage``` и показать изображение,

2) Указать ```altAsError``` и показать текст alt атрибута как ошибку.

>**Внимание**: Одновременно можно выбрать только один метод. ```errorImage``` приоритетнее ```altAsError```, если вы укажите оба то будет продемонстрирована картинка из errorImage параметра.

```
import React from 'react'
import Reimage from 'reimage';
import * as errorImage from './path/to/error;'

export default function HandleErrors() {
  return (
    <Reimage
    crossOrigin='anonymous'
    src={src}
    width={400}
    height={500}
    alt="oops"
    classNames="ClassName1, ClassName2, ClassNameN"
    wrapper="div"
    wrapperClass="customWrapperClassName"
    errorImage={errorImage}                               (1)
    altAsError={true}                                     (2)
  />
  )
}
  
```
**Компонент загрузки**

Чтобы добавить компонент загрузки просто укажите параметр ```fallbackComponent``` и опционально добавьте стили для него при помощи ```fallBackWrapperStyles```.

```
import React from 'react'
import Reimage from 'reimage';
import * as originalImage from './path/to/original;'

export default function BackdropColored() {
  return (
    <Reimage
    crossOrigin='anonymous'
    src={src}
    width={400}
    height={500}
    alt="oops"
    classNames="ClassName1, ClassName2, ClassNameN"
    wrapper="div"
    wrapperClass="customWrapperClassName"
    fallbackComponent={<Spinner />}
    fallBackWrapperStyles={{ position: 'absolute', zIndex: 2, left: '15%', top: '15%' }}
  />
  )
}
  
```

## Список параметров

Prop name               | Type                                           | Details
---                     | ---                                            | ---
`src`                   | *string or base64Image*                        | **Обязательный** параметр, указывает на источник изображения.
`classNames`            | *string*                                       | Строка с классами для изображения (если более одного лучше всего разбить пробелом).
`minifiedSrc`           | *string or base64Image*                        | Источник минифицированного изображения.
`fallbackComponent`     | *DOM element or ReactNode*                     | Компонент который показывается при загрузке.
`fallBackWrapperStyles` | *Object*                                       | Стили для компонента загрузки.
`backDropColor`         | *String*                                       | Цвет фона загрузки.
`backDropStyles`        | *Object*                                       | Стили для фона загрузки.
`wrapper`               | *string specified*                             | Создает внутреннюю обертку для изображения, имеет 3 возможных значения: div, span, p.
`wrapperClass`          | *string*                                       | Добавляет CSS класс элементу обертки.
`errorImage`            | *string or base64Image*                        | Указывает изображение для показа в случае ошибки при загрузке основного изображения из src.
`altAsError`            | *boolean*                                      | Отображать текст alt как ошибку.
`grayscale`             | *boolean*                                      | Сделать изображение черно белым.
`root`                  | *string*                                       | Указывает элемент который используется как viewPort для элемента.
`rootMargin`            | *string*                                       | Отступ вокруг root. такой же как css "10px 10px 10px 10px". Используется чтобы создать зазор для root для расчёта пересечения.
`threshold`             | *number*                                       | Может быть числом от 0 до 1 или процентами, обозначает какая часть target элемента должна пересечься с viewPort чтобы началась загрузка изображения.

В добавок к указанным параметрам вы можете передавать стандартные атрибуты img такие как alt, crossOrigin, и т.п. 

## Планы на следующие релизы

- Фон загрузки из основного цвета изображения,
- Градиентный фон,
- Новые возможности стилизации,

## Зависимости

**Reimage** имеет одну зависимость от `intersection-observer-polyfill` 

## Проблемы

Пожалуйста обращайтесь с правками и предложениями.

## Лицензия

**Reimage** доступна по лицензии MIT 