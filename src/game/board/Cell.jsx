import React, { PropTypes } from 'react';

function Cell({ cellId, onClick, children }) {
  const onClickFn = () => { onClick(cellId); };

  return (
    <span>
      <button id={cellId} onClick={onClickFn}>
        {children}
      </button>
    </span>
  );
}

Cell.propTypes = {
  children: PropTypes.node,
  cellId: PropTypes.string,
  onClick: PropTypes.func,
};

Cell.defaultProps = {
  children: null,
  onClick: Function.prototype,
};

export default Cell;
