import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

const defaultProps = {
  children: '',
  onClick: Function.prototype,
};

function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
