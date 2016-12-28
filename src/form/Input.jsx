import React, { PropTypes } from 'react';

const propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  placeholder: '',
  onChange: Function.prototype,
};

function Input({ onChange, placeholder }) {
  return (
    <input onChange={onChange} placeholder={placeholder} />
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
