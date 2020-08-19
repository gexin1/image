import * as React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import { getOffset } from 'rc-util/lib/Dom/css';
import Preview from './Preview';

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onClick'> {
  // Original
  src?: string;

  prefixCls?: string;
  placeholder?: React.ReactNode;
  fallback?: string;
  preview?: boolean;
  onPreviewClose?: (e: React.SyntheticEvent<HTMLDivElement | HTMLLIElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

type ImageStatus = 'normal' | 'error' | 'loading';

const ImageInternal: React.FC<ImageProps> = ({
  src,
  alt,
  onPreviewClose: onInitialPreviewClose,
  prefixCls = 'rc-image',
  placeholder,
  fallback,
  width,
  height,
  style,
  preview = true,
  className: originalClassName,
  onClick,

  // Img
  crossOrigin,
  decoding,
  loading,
  referrerPolicy,
  sizes,
  srcSet,
  useMap,
  ...otherProps
}) => {
  const [isShowPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<ImageStatus>(placeholder ? 'loading' : 'normal');
  const [mousePosition, setMousePosition] = useState<null | { x: number; y: number }>(null);
  const isError = status === 'error';

  const onLoad = () => {
    setStatus('normal');
  };

  const onError = () => {
    setStatus('error');
  };

  const onPreview: React.MouseEventHandler<HTMLDivElement> = e => {
    const { left, top } = getOffset(e.target);

    setShowPreview(true);
    setMousePosition({
      x: left,
      y: top,
    });

    if (onClick) onClick(e);
  };

  const onPreviewClose = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowPreview(false);
    setMousePosition(null);

    if (onInitialPreviewClose) onInitialPreviewClose(e);
  };

  React.useEffect(() => {
    if (placeholder) {
      setStatus('loading');
    }
  }, [src]);

  const className = cn(prefixCls, originalClassName, {
    [`${prefixCls}-error`]: isError,
  });

  const mergedSrc = isError && fallback ? fallback : src;
  const imgCommonProps = {
    crossOrigin,
    decoding,
    loading,
    referrerPolicy,
    sizes,
    srcSet,
    useMap,
    alt,
    className: `${prefixCls}-img`,
  };

  return (
    <div
      {...otherProps}
      className={className}
      onClick={preview && !isError ? onPreview : onClick}
      style={{
        ...style,
        width,
        height,
      }}
    >
      {isError && fallback ? (
        <img {...imgCommonProps} src={fallback} />
      ) : (
        <img {...imgCommonProps} onLoad={onLoad} onError={onError} src={src} />
      )}

      {status === 'loading' && <div className={`${prefixCls}-placeholder`}>{placeholder}</div>}
      {preview && !isError && (
        <Preview
          visible={isShowPreview}
          prefixCls={`${prefixCls}-preview`}
          onClose={onPreviewClose}
          mousePosition={mousePosition}
          src={mergedSrc}
          alt={alt}
        />
      )}
    </div>
  );
};

ImageInternal.displayName = 'Image';

export default ImageInternal;