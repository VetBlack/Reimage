/* eslint-disable @typescript-eslint/no-unused-vars */
import { CLASS_NAMES } from '../constants/index';

interface Attributes {
  [x: string]: any;
}

enum wrapperType {
  'div' = 1,
  'span',
  'p',
}

export const checkElementType = (element: any): boolean =>
  wrapperType[element] ? true : false;

export const generateClassName = (
  classNames: [string | boolean, string],
  separator: string,
): string => [...classNames].filter(el => el !== false).join(separator);

export const chooseSrc = (
  minSrc: string | undefined,
): { currentSrc: string; blurred: boolean } => {
  if (minSrc) {
    return { currentSrc: minSrc, blurred: true };
  }
  return { currentSrc: '', blurred: false };
};

export const generateFilter = (
  grayscale: number | undefined,
  blur: boolean,
): string =>
  `${grayscale ? `grayscale(${grayscale})` : ``} ${
    blur ? `blur(5px)` : ``
  }`.trim();

export const checkObserverSupport = (): boolean => {
  const observer: string = 'IntersectionObserver';
  const observerEntry: string = 'IntersectionObserverEntry';
  const ratio: string = 'intersectionRatio';

  if (
    observer in window &&
    observerEntry in window &&
    ratio in window.IntersectionObserverEntry.prototype
  ) {
    return true;
  }
  return false;
};

export const generateAttributes = ({
  src,
  alt,
  classNames,
  height,
  width,
  grayscale,
  backDropColor,
  minifiedSrc,
  fallbackComponent,
  fallBackWrapperStyles,
  wrapper,
  wrapperClass,
  threshold,
  errorImage,
  altAsError,
  backDropStyles,
  ...rest
}: Attributes): { backDropGeneratedStyle: object; attributes: object } => {
  const { currentSrc, blurred } = chooseSrc(minifiedSrc);
  const filter = generateFilter(grayscale, blurred);

  const style = {
    height,
    width,
    position: 'relative',
    filter,
  };
  const className =
    classNames &&
    generateClassName(
      [`${!blurred ? CLASS_NAMES.transparent_default : ``}`, classNames],
      ' ',
    );

  return {
    attributes: {
      'data-src': src,
      src: currentSrc,
      alt,
      style,
      className,
      ...rest,
    },
    backDropGeneratedStyle: {
      background: backDropColor,
      width,
      height,
      ...backDropStyles,
    },
  };
};

export function changeInnerText(
  el: HTMLElement,
  value: string | undefined,
): void {
  if (value) {
    el.innerText = value;
    return;
  }
  el.innerText = '';
  return;
}
