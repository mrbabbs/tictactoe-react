import React from 'react';
import NewGame from './NewGame';
import Board from './Board';

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
    const players = {
      X: 'Player X',
      O: 'Player O',
    };

    this.state = {
      players,
      create: true,
      playersId: Object.keys(players),
      complete: false,
      winner: '',
    };
    this.onInsertPlayer = this.onInsertPlayer.bind(this);
    this.onComplete = this.onComplete.bind(this);
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

  onComplete(winner = '') {
    this.setState({
      complete: true,
      winner,
    });
  }

  render() {
    const onStart = () => { this.onStart(); };

    return (
      <div>
        <h3>
          {Game.generatePlayersLabel(this.state.players)}
        </h3>
        {
          (
            this.state.complete &&
            <span>End - {this.state.players[this.state.winner]}</span>
          ) ||
          (
            this.state.create &&
              <NewGame
                playersId={this.state.playersId}
                onInsertPlayer={this.onInsertPlayer}
                onStart={onStart}
              />
          ) ||
          <Board
            playersId={this.state.playersId}
            onComplete={this.onComplete}
          />
        }
      </div>
    );
  }
}

export default Game;
