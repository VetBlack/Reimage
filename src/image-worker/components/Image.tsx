import React, { useState, useRef, useEffect } from 'react';
import { ERRORS, CLASS_NAMES } from '../../constants/index';
import { checkObserverSupport, generateAttributes } from '../../utils/main';
import './image.style.scss';
import { onIntersection, fallBackConstructor, imageConstructor } from './utils';
import { ImagePropsInterface } from '../interfaces/image.props.interface';

/**
 * @param {any} src - source of image, required.
 * @param {string} classNames - list of classNames.
 * @param {string} minifiedSrc - source of minified image.
 * @param {ReactNode} fallbackComponent - component to show when loading img.
 * @param {object} fallBackWrapperStyles - styles for fallBackComponent.
 * @param {string} backDropColor - color for image backdrop.
 * @param {object} backDropStyles - styles for image backdrop.
 * @param {ReactNode} wrapper - wrapper component for image.
 * @param {string} wrapperClass - className for wrapper component.
 * @param {string} errorImage - src for image showed when error occurs.
 * @param {boolean} altAsError - use text from alt attribute as error message.
 * @param {number} grayscale - make image grayscale, values from 0 to 1.
 * @param {Element | Document | null} root - root element for intersection observer API.
 * @param {string} rootMargin - root margin for intersection observer API.
 * @param {string} threshold - threshold for intersection observer API.
 */

const Reimage = (props: ImagePropsInterface) => {
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
