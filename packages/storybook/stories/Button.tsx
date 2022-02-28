import PropTypes from 'prop-types';
import React from 'react';

export interface buttonProps {
  primary: boolean;
  backgroundColor?: React.CSSProperties;
  size: string;
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label }: buttonProps) => {
  const mode = primary ? 'btn-primary' : 'btn-secondary';
  const sz = !!size
    ? size === 'large'
      ? 'btn-lg'
      : size === 'small'
      ? 'btn-sm'
      : ''
    : '';
  return (
    <button
      type="button"
      className={['btn', mode, sz]
        .filter((str) => str.length > 0)
        .reduce((a, b) => `${a} ${b}`)}
      style={backgroundColor && { ...backgroundColor }}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
