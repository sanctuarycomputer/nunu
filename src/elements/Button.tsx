import React, { PureComponent, MouseEvent, RefObject } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import linkIsExternal from 'utils/linkIsExternal';

interface Props {
  className: string;
  style: React.CSSProperties;
  variant: 'primary' | 'no-style';
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  ariaLabel: string;
  children?: React.ReactNode;
  to: string;
  isAnchor: boolean;
  openInCurrentTab: boolean;
  openInNewTab: boolean;
  onClick(e: MouseEvent<HTMLElement>): void;
  onMouseEnter(e: MouseEvent<HTMLElement>): void;
  onMouseLeave(e: MouseEvent<HTMLElement>): void;
  onTouchStart(e: MouseEvent<HTMLElement>): void;
  elemRef?: RefObject<HTMLAnchorElement | Link | HTMLButtonElement>;
  wrap: boolean;
  disabled: boolean;
}

const defaultProps = {
  className: '',
  style: {},
  to: '',
  isAnchor: false,
  openInCurrentTab: false,
  openInNewTab: false,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onTouchStart: () => {},
  wrap: false,
  disabled: false,
};

class Button extends PureComponent<Props> {
  static defaultProps = defaultProps;

  render() {
    const {
      className,
      style,
      variant,
      type,
      label,
      ariaLabel,
      children,
      to,
      isAnchor,
      openInCurrentTab,
      openInNewTab,
      onClick,
      onMouseLeave,
      onMouseEnter,
      elemRef,
      wrap,
      disabled,
    } = this.props;

    const classes = cx(`Button pointer text-button p0`, className, {
      [`Button--variant-${variant}`]: !!variant,
      [`Button--disabled-${variant}`]: !!disabled,
      'Button--wrap': wrap,
    });

    const linkIsMailOrTel = to.includes('mailto:') || to.includes('tel:');

    const linkedComponent =
      linkIsMailOrTel || linkIsExternal(to) || openInNewTab || isAnchor ? (
        <a
          className={cx('text-decoration-none inline-flex', classes, {
            'events-none': disabled,
          })}
          target={openInCurrentTab || linkIsMailOrTel ? '_self' : '_blank'}
          href={to}
          rel="noopener"
          onClick={onClick}
          aria-label={ariaLabel}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          ref={elemRef as RefObject<HTMLAnchorElement>}
        >
          {!!children && !label ? (
            children
          ) : (
            <span className="flex justify-center items-center pb_25">{label}</span>
          )}
        </a>
      ) : (
        <Link
          className={cx('text-decoration-none inline-flex', classes, {
            'events-none': disabled,
          })}
          aria-label={ariaLabel}
          to={to}
          onClick={onClick}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          ref={elemRef as RefObject<HTMLAnchorElement>}
        >
          {!!children && !label ? (
            children
          ) : (
            <span className="flex justify-center items-center pb_25">{label}</span>
          )}
        </Link>
      );

    const button = !!to ? (
      linkedComponent
    ) : (
      <button
        aria-label={ariaLabel}
        type={type}
        onClick={onClick}
        className={cx(classes, {
          'events-none': disabled,
          pb_25: variant !== 'no-style',
        })}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={elemRef as RefObject<HTMLButtonElement>}
        disabled={disabled}
      >
        {!!children && !label ? children : label}
      </button>
    );

    return button;
  }
}

export default Button;
