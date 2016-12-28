import React, { PropTypes } from 'react';
import Cell from './Cell';

const propTypes = {
  rowId: PropTypes.string,
  numCells: PropTypes.number,
  contentCells: PropTypes.arrayOf(PropTypes.string),
  onCellClick: PropTypes.func,
};

const defaultProps = {
  numCells: 3,
  contentCells: [],
  onCellClick: Function.prototype,
};

export function renderCells(num, rowId, contentCells, onCellClick) {
  const cells = [];

  for (let i = 0; i < num; i += 1) {
    cells.push(
      <Cell key={i} cellId={`${rowId}-${i}`} onClick={onCellClick}>
        {contentCells[i]}
      </Cell>,
    );
  }

  return cells;
}

function Row({ rowId, numCells, contentCells, onCellClick }) {
  return (
    <div id={rowId}>
      {renderCells(numCells, rowId, contentCells, onCellClick)}
    </div>
  );
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
