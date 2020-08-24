import React from 'react';
import { reactNode } from '../interfaces/types';
import { ImageComponentState } from '../interfaces/image.state.interface';
import { ImagePropsInterface } from '../interfaces/image.props.interface';
import { checkElementType } from '../../utils/main';
import { ERRORS, STYLES, CLASS_NAMES } from '../../constants/index';
import {
  generateClassName,
  chooseSrc,
  generateFilter,
  checkObserverSupport,
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

class Reimage extends React.Component<
  ImagePropsInterface,
  ImageComponentState
  > {
  constructor(
    public props: ImagePropsInterface,
    public observer: IntersectionObserver,
    public currentImage: React.RefObject<HTMLImageElement>,
    public fallbackContainer: React.RefObject<HTMLDivElement>,
  ) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false,
    };

    this.currentImage = React.createRef();
    this.fallbackContainer = React.createRef();
  }

  public onIntersection(img: any, observer: IntersectionObserver): void {
    const { isIntersecting } = img;
    const { fallbackContainer } = this;
    const { errorImage, grayscale, altAsError, alt } = this.props;

    if (isIntersecting) {
      const { target } = img;

      observer.unobserve(img.target);
      target.src = target.dataset.src;

      target.onload = () => {
        target.style.filter = generateFilter(grayscale, false);
        target.classList.remove(CLASS_NAMES.transparent_default);
        target.removeAttribute('data-src');
        this.setState({ isLoaded: true });
      };
      target.onerror = () => {
        this.setState({ isLoaded: true });
        if (errorImage) {
          return (target.src = errorImage);
        } else if (altAsError) {
          if (fallbackContainer.current) {
            fallbackContainer.current.innerText = alt!;
          }
        }
        return (target.style.display = 'none');
      };
    }
  }

  public componentDidMount(): void {
    const { threshold, root, rootMargin } = this.props;
    const options: IntersectionObserverInit = { threshold, root, rootMargin };
    if (checkObserverSupport()) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entree => {
          this.onIntersection.call(this, entree, this.observer);
        });
      }, options);

      const { current } = this.currentImage;
      if (current) {
        this.observer.observe(current);
      }
    } else {
      throw new Error(ERRORS.support);
    }
  }

  public imageConstructor(ref: object, attributes: object): React.ReactElement {
    const { wrapper, wrapperClass } = this.props;
    const img = React.createElement('img', { ref, ...attributes });

    if (checkElementType(wrapper)) {
      const wrapped = React.createElement(
        wrapper as any,
        { className: wrapperClass },
        {},
        img,
      );
      return wrapped;
    }
    return img;
  }

  public fallBackConstructor(
    fallbackComponent: reactNode | undefined,
    fallBackWrapperStyles: object | undefined,
  ): JSX.Element {
    return (
      <div
        style={
          fallBackWrapperStyles || STYLES.fallBackDefault
        }
      >
        {fallbackComponent}
      </div>
    );
  }

  public componentWillUnmount(): void {
    this.observer.disconnect();
  }

  public render(): JSX.Element {
    const {
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
    } = this.props;

    const { isLoaded } = this.state;

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
    const attributes = {
      'data-src': src,
      src: currentSrc,
      alt,
      style,
      className,
      ...rest,
    };

    return (
      <div
        style={{
          background: backDropColor,
          width,
          height,
          ...backDropStyles,
        }}
        className={CLASS_NAMES.backdrop_default}
        ref={this.fallbackContainer}
      >
        {!isLoaded &&
          this.fallBackConstructor(fallbackComponent, fallBackWrapperStyles)}
        {this.imageConstructor(this.currentImage, attributes)}
      </div>
    );
  }
}

export { Reimage };
