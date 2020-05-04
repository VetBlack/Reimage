import React from 'react';
import ObserverPolyfill from 'intersection-observer-polyfill';
import { reactNode } from '../interfaces/types';
import { ImageComponentState } from '../interfaces/image.state.interface';
import { ImagePropsInterface } from '../interfaces/image.props.interface';
import { checkElementType } from '../../utils/main';
import {
  generateClassName,
  chooseSrc,
  generateFilter,
  checkObserverSupport,
} from '../../utils/main';
import './image.style.scss';

class Reimage extends React.Component<
  ImagePropsInterface,
  ImageComponentState
> {
  constructor(
    public props: any,
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
        target.classList.remove('transparent_default');
        target.removeAttribute('data-src');
        this.setState({ isLoaded: true });
      };
      target.onerror = () => {
        this.setState({ isLoaded: true });
        if (errorImage) {
          return (target.src = errorImage);
        } else if (altAsError) {
          if (fallbackContainer.current) {
            fallbackContainer.current.innerText = alt;
          }
        }
        return (target.style.display = 'none');
      };
    }
  }

  public componentDidMount(): void {
    const { threshold, root, rootMargin } = this.props;
    const options = {
      root: root || null,
      rootMargin: rootMargin || '0px 0px 50px 0px',
      threshold,
    };

    if (checkObserverSupport()) {
      // native observer
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          this.onIntersection.call(this, e, this.observer);
        });
      }, options);

      const { current } = this.currentImage;
      if (current) {
        this.observer.observe(current);
      }
    } else {
      // polyfill observer
      this.observer = new ObserverPolyfill(
        (entries: [IntersectionObserverEntry]) => {
          entries.forEach((e: IntersectionObserverEntry) => {
            this.onIntersection.call(this, e, this.observer);
          });
        },
        options,
      );
      const { current } = this.currentImage;
      if (current) {
        this.observer.observe(current);
      }
    }
  }

  public imageConstructor(ref: object, attributes: object): React.ReactElement {
    const { wrapper, wrapperClass } = this.props;

    const img = React.createElement('img', { ref, ...attributes });

    if (checkElementType(wrapper)) {
      const wrapped = React.createElement(
        wrapper,
        { className: wrapperClass },
        img,
      );
      return wrapped;
    }
    return img;
  }

  public fallBackConstructor(
    fallbackComponent: reactNode,
    fallBackWrapperStyles: object,
  ): JSX.Element {
    return (
      <div
        style={
          fallBackWrapperStyles || {
            position: 'absolute',
            zIndex: 2,
            left: '35%',
            top: '35%',
          }
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
        [`${!blured ? `transparent_default` : ``}`, classNames],
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
        className="backdrop_default"
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
