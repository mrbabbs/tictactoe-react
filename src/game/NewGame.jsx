import React, { PropTypes } from 'react';
import Input from '../form/Input';
import Button from '../form/Button';

const propTypes = {
  playersId: PropTypes.array,
  onInsertPlayer: PropTypes.func,
  onStart: PropTypes.func,
  onReset: PropTypes.func,
};

const defaultProps = {
  playersId: [],
  onInsertPlayer: Function.prototype,
  onStart: Function.prototype,
  onReset: Function.prototype,
};

export function validateInput(value) {
  const pattern = /^[a-zA-Z0-9]([a-zA-Z0-9_-])*$/;

  return pattern.test(value);
}

export function generateInputPlayers(playersId, fn) {
  const inputs = [];

  playersId.forEach((key) => {
    const onTypePlayer = k => (event) => {
      const target = event.target;
      const {
        value,
        placeholder,
      } = event.target;

      if (value !== '' && !validateInput(value)) {
        target.value = value.substring(0, value.length - 1);
        return;
      }

      fn(k, value || placeholder);
    };
    const placeholder = `Player ${key}`;

    inputs.push(
      <p key={key}>
        <Input onChange={onTypePlayer(key)} placeholder={placeholder} />
      </p>,
    );
  });

  return inputs;
}

function NewGame({ playersId, onInsertPlayer, onStart, onReset }) {
  return (
    <div>
      <h4>New Game</h4>

      {generateInputPlayers(playersId, onInsertPlayer)}

      <p>
        <Button onClick={onStart}>Start</Button>
        <Button onClick={onReset}>Reset</Button>
      </p>
    </div>
  );
}

NewGame.propTypes = propTypes;
NewGame.defaultProps = defaultProps;

export default NewGame;
