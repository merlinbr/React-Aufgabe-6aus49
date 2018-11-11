import React from 'react';
import Field from './GameField/Field';

export default class GameField extends React.Component {
  /**
   * the createGameField function creates a List of Fields and passes some parent functions to the Field component
   * @param incrementFunc that increments the numberOfActiveFields by 1 (e.g. 4 to 5)
   * @param decrementFunc that decrements the numberOfActiveFields by 1 (e.g. 5 to 4)
   * @param getNumberOfActiveFieldsFunc that gets the numberOfActiveFields (e.g. 4)
   * @param getFieldStateFunc that gets the state of a specific field (e.g. true for the field "4")
   * @param modifyFieldStateFunc that modifies the state of a specific field (e.g. false to true for field "4")
   * @returns a gameField Array with a list of Fields
   */
  static createGameField(incrementFunc, decrementFunc, getNumberOfActiveFieldsFunc, getFieldStateFunc, modifyFieldStateFunc) {
    const numberOfFields = 49;
    let gameField = [];

    for (let i = 0; i < numberOfFields; i++) {
      // create fields and add them to the gameField list
      gameField.push(
        <Field
          fieldValue={i + 1}
          key={i.toString()}
          incrementActiveFields={incrementFunc}
          decrementActiveFields={decrementFunc}
          getNumberOfActiveFields={getNumberOfActiveFieldsFunc}
          getFieldState={getFieldStateFunc}
          modifyFieldState={modifyFieldStateFunc}
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
          this.props.getNumberOfActiveFields,
          this.props.getFieldState,
          this.props.modifyFieldState
        )}
      </div>
    );
  }
}
