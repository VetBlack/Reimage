import React from 'react';
import { STYLES, CLASS_NAMES } from '../../constants/index';
import {
  checkElementType,
  generateFilter,
  changeInnerText,
} from '../../utils/main';
import { ImagePropsInterface } from '../interfaces/image.props.interface';

export const imageConstructor = (
  ref: object,
  attributes: object,
  props: ImagePropsInterface,
): React.ReactElement => {
  const { wrapper, wrapperClass } = props;
  const img = React.createElement('img', { ref, ...attributes });

  if (checkElementType(wrapper)) {
    const wrapped = React.createElement(
      wrapper as string,
      { className: wrapperClass },
      img,
    );
    return wrapped;
  }
  return img;
};

export const fallBackConstructor = (
  fallbackComponent: React.ReactNode | undefined,
  fallBackWrapperStyles: object | undefined,
): React.ReactElement => {
  return React.createElement(
    'div',
    { style: fallBackWrapperStyles || STYLES.fallBackDefault },
    fallbackComponent,
  );
};

export const onIntersection = (
  img: any,
  observer: IntersectionObserver,
  errorImage: string | undefined,
  grayscale: number | undefined,
  altAsError: boolean | undefined,
  alt: string | undefined,
  changeLoadState: (q: boolean) => void,
  fallbackContainer: React.RefObject<HTMLDivElement>,
) => {
  const { isIntersecting } = img;

  if (isIntersecting) {
    const { target } = img;

    observer.unobserve(img.target);

    target.src = target.dataset.src;

    target.onload = () => {
      target.style.filter = generateFilter(grayscale, false);
      target.classList.remove(CLASS_NAMES.transparent_default);
      target.removeAttribute('data-src');
      changeLoadState(true);
    };
    target.onerror = () => {
      changeLoadState(true);

      if (errorImage) {
        return (target.src = errorImage);
      } else if (altAsError) {
        if (fallbackContainer.current != null) {
          changeInnerText(fallbackContainer.current, alt);
        }
      }

      return (target.style.display = 'none');
    };
  }
};
