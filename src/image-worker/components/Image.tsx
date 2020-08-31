import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { reactNode } from '../interfaces/types';
import { ImagePropsInterface } from '../interfaces/image.props.interface';
import { checkElementType } from '../../utils/main';
import { ERRORS, STYLES, CLASS_NAMES } from '../../constants/index';
import {
  generateFilter,
  checkObserverSupport,
  generateAttributes,
  changeInnerText,
} from '../../utils/main';
import './image.style.scss';

/**
 * @param {any} src - source of image, required.
 * @param {string} classNames - list of classNames.
 * @param {string} minifiedSrc - source of minified image.
 * @param {any} fallbackComponent - component to show when loading img.
 * @param {object} fallBackWrapperStyles - styles for fallBackComponent.
 * @param {string} backDropColor - color for image backdrop.
 * @param {object} backDropStyles - styles for image backdrop.
 * @param {any} wrapper - wrapper component for image.
 * @param {string} wrapperClass - className for wrapper component.
 * @param {string} errorImage - src for image showed when error occurs.
 * @param {boolean} altAsError - use text from alt attribute as error message.
 * @param {number} grayscale - make image grayscale, values from 0 to 1.
 * @param {string} root - root element for intersection observer API.
 * @param {string} rootMargin - root margin for intersection observer API.
 * @param {string} threshold - threshold for intersection observer API.
 */

function imageConstructor(
  ref: object,
  attributes: object,
  props: ImagePropsInterface,
): React.ReactElement {
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
}

function fallBackConstructor(
  fallbackComponent: reactNode | undefined,
  fallBackWrapperStyles: object | undefined,
): React.ReactElement {
  return React.createElement(
    'div',
    { style: fallBackWrapperStyles || STYLES.fallBackDefault },
    fallbackComponent,
  );
}

function onIntersection(
  img: any,
  observer: IntersectionObserver,
  errorImage: string | undefined,
  grayscale: number | undefined,
  altAsError: boolean | undefined,
  alt: string | undefined,
  changeLoadState: (q: boolean) => void,
  fallbackContainer: React.RefObject<HTMLDivElement>,
): void {
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
}

const Reimage: FunctionComponent<ImagePropsInterface> = (
  props: ImagePropsInterface,
) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const currentImage = useRef<HTMLImageElement>(null);
  const fallbackContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const {
      threshold,
      root,
      rootMargin,
      errorImage,
      grayscale,
      altAsError,
      alt,
    } = props;
    let observer: IntersectionObserver;
    const options: IntersectionObserverInit = { threshold, root, rootMargin };
    if (checkObserverSupport()) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entree => {
          onIntersection(
            entree,
            observer,
            errorImage,
            grayscale,
            altAsError,
            alt,
            setIsLoaded,
            fallbackContainer,
          );
        });
      }, options);

      const { current } = currentImage;

      if (current) {
        observer.observe(current!);
      }
    } else {
      throw new Error(ERRORS.support);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  const { attributes, backDropGeneratedStyle } = generateAttributes(props);
  const { fallbackComponent, fallBackWrapperStyles } = props;
  return (
    <div
      style={backDropGeneratedStyle}
      className={CLASS_NAMES.backdrop_default}
      ref={fallbackContainer}
    >
      {!isLoaded &&
        fallBackConstructor(fallbackComponent, fallBackWrapperStyles)}
      {imageConstructor(currentImage, attributes, props)}
    </div>
  );
};

export { Reimage };
