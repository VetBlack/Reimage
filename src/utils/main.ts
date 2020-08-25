import { CLASS_NAMES } from '../constants/index';
interface Attributes {
  [x: string]: any;
}
// interface AttributesOutput {
//   currentSrc: string;
//   blured: boolean;
//   filter: string;
//   style: object;
//   className: string;
//   attributes: object;
// }

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
): { currentSrc: string; blured: boolean } => {
  if (minSrc) {
    return { currentSrc: minSrc, blured: true };
  }
  return { currentSrc: '', blured: false };
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
}: Attributes): any => {
  const { currentSrc, blured } = chooseSrc(minifiedSrc);
  const filter = generateFilter(grayscale, blured);

  const style = {
    height,
    width,
    position: 'relative',
    filter,
  };
  const className =
    classNames &&
    generateClassName(
      [`${!blured ? CLASS_NAMES.transparent_default : ``}`, classNames],
      ' ',
    );

  return {
    attributes: {
      'data-src': src,
      src: currentSrc,
      alt,
      style,
      className,
      ...rest
    },
    backDropGeneratedStyle: {
      background: backDropColor,
      width,
      height,
      ...backDropStyles,
    }
  };
};
