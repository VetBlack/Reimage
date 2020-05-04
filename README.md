# Reimage

[Reimage docs in russian]('/README_RU.md')

**Reimage** is a react library for comfortable working with images and improvement of user experience. Basically **Reimage** is all you need,because it supports all default image attributes, and provides many new useful features such as:

- Image lazy loading,
- Customizable visibility threshold,
- Handling broken images,
- Fallback components, spinners support on image loading,
- Styling and customization, 

**Reimage** also can be used in third-party sliders, galleries etc. 

>**Caution:** Intersection observer API used in **Reimage** check if your target browsers [support it](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility) 

## Installation

1. To install `reimage` use:

**npm**

```
npm install reimage --save
```
**yarn**

```
yarn add reimage
```

## Documentation

To use `Reimage` in your project:

```
import Reimage from 'reimage';

or

const Reimage = require('reimage');

```
Example:
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
    classNames="ClassName1, ClassName2, ClassNameN"
  />
  )
}
  
```

## Cookbook

**Blured image loading**

To have blured image loading you have to create minified copy of your image and pass it in the component.

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

**Colored backdrop on image loading**

To have colored backdrop on load you just have to specify color you want in prop ```backDropColor```.

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

**Handling error on image loading**

If your image not loaded for some reason you can handle this in several ways

1) Specify ```errorImage``` and show image,

2) Specify ```altAsError``` and show text from alt attribute as error in image container.

>**Note**: Don`t choose two error handling methods at the same time. ```errorImage``` have more priority then ```altAsError```, so when checked both showed will be only ```errorImage```.

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
    altAsError={true}                                     (1)
    errorImage={errorImage}                               (2)
  />
  )
}
  
```
**Loading image with fallback**

To add fallback to your image just specify prop ```fallbackComponent``` and optionally provide styles for it with ```fallBackWrapperStyles```.

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

## Props list

Prop name               | Type                                           | Details
---                     | ---                                            | ---
`src`                   | *string or base64Image*                        | **REQUIRED** prop, specifies source of image.
`classNames`            | *string*                                       | String of provided class names (best separate with space).
`minifiedSrc`           | *string or base64Image*                        | Source of minified image.
`fallbackComponent`     | *DOM element or ReactNode*                     | Fallback showed when image loading.
`fallBackWrapperStyles` | *Object*                                       | Styles for `fallbackComponent` wrapper.
`backDropColor`         | *String*                                       | Specifies backDrop color.
`backDropStyles`        | *Object*                                       | Specifies backDrop styles.
`wrapper`               | *string specified*                             | Creates inner wrapper for image, have 3 possible values: div, span, p.
`wrapperClass`          | *string*                                       | Add provided className to wrapper.
`errorImage`            | *string or base64Image*                        | Specifies image showed if image provided in src not loaded.
`altAsError`            | *boolean*                                      | Show alt text as error in image container.
`grayscale`             | *boolean*                                      | Make image black and white colored.
`root`                  | *string*                                       | Specified element that is used as the viewport for checking visibility of the target.
`rootMargin`            | *string*                                       | Margin around the root. similar to css "10px 10px 10px 10px". Used to create gap before loading image
`threshold`             | *number*                                       | Can be number or percentage defines how much root should be showed before start loading image.

In addition to provided props you can use default image attributes such as alt, crossOrigin etc.

## Features in next releases

- Main image color backDrop,
- Gradient backDrop,
- New styling,

## Dependencies

**Reimage** have only one dependence from `intersection-observer-polyfill` 

## Issues

Please feel free to report issues, improvements and new features

## License

**Reimage** is available under the MIT License