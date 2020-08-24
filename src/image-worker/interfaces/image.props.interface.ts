import { reactNode, element } from './types';

export interface ImagePropsInterface extends Partial<HTMLImageElement> {
  src: any;
  classNames?: string;

  minifiedSrc?: string;
  fallbackComponent?: reactNode;
  fallBackWrapperStyles?: object;
  backDropColor?: string;
  backDropStyles?: object;
  wrapper?: reactNode;
  wrapperClass?: string;
  errorImage?: string;
  altAsError?: boolean;
  grayscale?: number;
  alt?: string;
  root?: element;
  rootMargin?: string;
  threshold?: number; // from 0 to 1
}
