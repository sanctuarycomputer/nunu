import React, { FC } from 'react';
import cx from 'classnames';

import { TextStyleVariation, Color } from './types';

type Element = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type Props = {
  color?: Color;
  element?: Element;
  uppercase?: boolean;
  variation?: TextStyleVariation;
  dangerouslySetInnerHTML?: { __html: string };
};

const TextStyle: FC<Props> = ({
  children,
  color = 'inherit',
  element = 'span',
  uppercase,
  variation = 'body-1',
}) => {
  const props = {
    className: cx(`text-style--${variation}`, {
      [`color-${color}`]: color !== 'inherit',
      uppercase,
    }),
    children,
  };
  return React.createElement(element, props);
};

export default TextStyle;
