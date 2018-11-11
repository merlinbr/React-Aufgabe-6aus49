import React from 'react';
import Field from './GameField/Field';

export default class GameField extends React.Component {
  static createGameField(incrementFunction, decrementFunction, getActiveFieldsFunction) {
    const numberOfFields = 49;
    let gameField = [];

    // create fields
    for (let i = 0; i < numberOfFields; i++) {
      // add field to the gameField
      gameField.push(
          <Field
              fieldValue={i + 1}
              key={i.toString()}
              incrementActiveFields={incrementFunction}
              decrementActiveFields={decrementFunction}
              getNumberOfActiveFields={getActiveFieldsFunction}
          />
      );
    }
    return gameField
  }

  render() {
    return (
        <div className="game-field-container">
          { GameField.createGameField(
              this.props.incrementActiveFields,
              this.props.decrementActiveFields,
              this.props.getNumberOfActiveFields
          ) }
        </div>
    );
  }
}
