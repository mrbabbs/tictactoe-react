import React, { PropTypes } from 'react';
import Row from './board/Row';

const propTypes = {
  onCellClick: PropTypes.func,
  numRows: PropTypes.number,
  numCells: PropTypes.number,
  contentCells: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  onCellClick: Function.prototype,
  numRows: 0,
  numCells: 0,
  contentCells: [],
};

class Board extends React.Component {
  renderRows() {
    const rows = [];
    const {
      numRows,
      numCells,
      contentCells,
      onCellClick,
    } = this.props;

    for (let i = 0; i < numRows; i += 1) {
      rows.push(
        <Row
          key={i}
          numCells={numCells}
          rowId={`${i}`}
          contentCells={contentCells[i].split('')}
          onCellClick={onCellClick}
        />,
      );
    }

    return rows;
  }

  render() {
    return (
      <div>
        {this.renderRows()}
      </div>
    );
  }
}

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
