export interface ImagePropsInterface extends Partial<HTMLImageElement> {
  src: string;
  classNames?: string;
  minifiedSrc?: string;
  fallbackComponent?: React.ReactNode;
  fallBackWrapperStyles?: object;
  backDropColor?: string;
  backDropStyles?: object;
  wrapper?: React.ReactNode;
  wrapperClass?: string;
  errorImage?: string;
  altAsError?: boolean;
  grayscale?: number;
  alt?: string;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}
