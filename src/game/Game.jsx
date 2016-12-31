import React from 'react';
import NewGame from './NewGame';
import Board from './Board';
import Button from '../form/Button';

const defaultPlayers = {
  X: 'Player X',
  O: 'Player O',
};

class Game extends React.Component {
  static generatePlayersLabel(players) {
    const spans = [];

    Object.keys(players).forEach((key, index) => {
      spans.push(<span key={key}>{players[key]}</span>);
      spans.push(<span key={`vs${index}`}> vs </span>);
    });

    spans.pop();

    return spans;
  }

  constructor() {
    super();


    this.state = {
      players: { ...defaultPlayers },
      create: true,
      playersId: Object.keys(defaultPlayers),
      complete: false,
      winner: '',
      board: ['---', '---', '---'],
      currentPlayerIndex: 0,
    };
    this.onInsertPlayer = this.onInsertPlayer.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
  }

  onInsertPlayer(playerId, name) {
    const players = this.state.players;
    players[playerId] = name;
    this.setState({ players });
  }

  onStart() {
    this.setState({
      create: false,
    });
  }

  onCellClick(id) {
    this.setCellValue(id, this.getCurrentPlayerId());
  }

  onRestart() {
    this.setState({
      create: false,
      complete: false,
      winner: '',
      board: ['---', '---', '---'],
      currentPlayerIndex: 0,
    });
  }

  onNewGame() {
    this.setState({
      players: { ...defaultPlayers },
      create: true,
      playersId: Object.keys(defaultPlayers),
      complete: false,
      winner: '',
      board: ['---', '---', '---'],
      currentPlayerIndex: 0,
    });
  }

  getCurrentPlayerId() {
    return this.state.playersId[this.state.currentPlayerIndex];
  }

  setComplete(winner = '') {
    this.setState({
      complete: true,
      winner,
    });
  }

  setNextPlayerIndex(currentIndex) {
    const currentPlayerIndex =
      (currentIndex + 1) % this.state.playersId.length;

    this.setState({
      currentPlayerIndex,
    });
  }

  setCellValue(id, value) {
    const [i, j] = id.split('-');
    const { board } = this.state;
    const row = board[i].split('');

    if (row[j] !== '-') return;

    row[j] = value;
    board[i] = row.join('');

    this.setState({
      board,
    });

    this.checkBoard(value);

    this.setNextPlayerIndex(this.state.currentPlayerIndex);
  }

  hasHorizontalSolution(currentPlayerId) {
    const stringCheck =
      `${currentPlayerId}${currentPlayerId}${currentPlayerId}`;

    for (let i = 0; i < 3; i += 1) {
      if (this.state.board[i] === stringCheck) return true;
    }

    return false;
  }

  hasVerticalSolution(currentPlayerId) {
    let isCompleted = true;
    for (let i = 0; i < 3; i += 1) {
      isCompleted = true;
      for (let j = 0; j < 3; j += 1) {
        if (this.state.board[j][i] !== currentPlayerId) {
          isCompleted = false;
        }
      }

      if (isCompleted) return isCompleted;
    }

    return isCompleted;
  }

  hasDiagonalSolution(currentPlayerId) {
    const stringCheck =
      `${currentPlayerId}${currentPlayerId}${currentPlayerId}`;
    let currentSolution = '';

    for (let i = 0, j = 0; i < 3; j = i += 1) {
      currentSolution += this.state.board[i][j];
    }

    if (currentSolution === stringCheck) return true;

    currentSolution = '';
    for (let i = 2, j = 0; j < 3; i -= 1, j += 1) {
      currentSolution += this.state.board[i][j];
    }

    return currentSolution === stringCheck;
  }

  checkBoard(currentPlayerId) {
    if (this.hasHorizontalSolution(currentPlayerId) ||
        this.hasVerticalSolution(currentPlayerId) ||
        this.hasDiagonalSolution(currentPlayerId)
    ) {
      this.setComplete(currentPlayerId);
      return;
    }

    for (let i = 0; i < 3; i += 1) {
      if (this.state.board[i].includes('-')) return;
    }

    this.setComplete();
  }

  shouldRenderEndGame() {
    return (
      this.state.complete &&
        <div>
          <span>End - {this.state.players[this.state.winner]}</span>
          <p>
            <Button onClick={this.onRestart}>Restart</Button>
            <Button onClick={this.onNewGame}>New Game</Button>
          </p>
        </div>
    );
  }

  shouldRenderNewGame() {
    return (
      !this.state.complete &&
      this.state.create &&
      <NewGame
        playersId={this.state.playersId}
        onInsertPlayer={this.onInsertPlayer}
        onStart={this.onStart}
      />
    );
  }

  shouldRenderBoard() {
    return (
      !this.state.complete &&
      !this.state.create &&
      <Board
        playersId={this.state.playersId}
        onComplete={this.onComplete}
        numRows={3}
        numCells={3}
        contentCells={this.state.board}
        onCellClick={this.onCellClick}
      />
    );
  }

  render() {
    return (
      <div>
        <h3>
          {Game.generatePlayersLabel(this.state.players)}
        </h3>
        {this.shouldRenderBoard() ||
          this.shouldRenderEndGame() ||
          this.shouldRenderNewGame()}
      </div>
    );
  }
}

export default Game;
