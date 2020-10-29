import React, { useState } from 'react';
import cx from 'classnames';

import getAspectRatio from 'utils/getAspectRatio';

import { ImageDimensions, ImageCrop } from 'lib/cms';

type Props = {
  alt: string;
  isBg?: boolean;
  src: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
  preloadClassName?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onLoad?: () => any;
  dimensions?: ImageDimensions;
  crop?: ImageCrop;
};

const Img: React.FC<Props> = ({
  alt,
  isBg = false,
  src,
  srcSet,
  sizes,
  className = 'w100',
  preloadClassName,
  children = null,
  style,
  onLoad,
  dimensions,
  crop,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onImageLoad = () => {
    if (onLoad) onLoad();
    setIsLoaded(true);
  };

  const bgStyle = {
    backgroundColor: '#b2ada8',
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    ...(style ? style : {}),
  };

  const classes = cx('Img transition-long', className, {
    'Img--active': isLoaded || isBg,
  });

  if (isBg) {
    return (
      <div className={classes} style={bgStyle}>
        <img onLoad={onImageLoad} className="w100 h100" src={src} alt={alt} />
      </div>
    );
  }

  if (!srcSet && !sizes) {
    return <img onLoad={onImageLoad} className={classes} style={style} src={src} alt={alt} />;
  }

  return (
    <>
      {dimensions && (
        <div
          className={cx(classes, preloadClassName, {
            'bg-color-gray': !isLoaded,
            'bg-color-transparent': isLoaded,
          })}
          style={{ paddingTop: `${getAspectRatio(dimensions, crop)}%` }}
        />
      )}
      <picture>
        <img
          className={cx(classes, {
            'absolute t0 r0 l0 w100': dimensions,
          })}
          onLoad={onImageLoad}
          style={style}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
        />
      </picture>
    </>
  );
};

export default Img;
