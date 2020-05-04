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
  minSrc: string,
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
  `${grayscale && `grayscale(${grayscale})`} ${blur ? `blur(5px)` : ``}`;

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
