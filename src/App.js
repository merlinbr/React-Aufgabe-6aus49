import React, { Component } from 'react';
import './App.css';

import GameField from './components/GameField';
import Header from './components/Header';
import SuccessButton from "./components/SuccessButton";

class App extends Component {
  constructor() {
    super();
    this.state = {
      numberOfActiveFields: 0,
      activeFields: [],
      fieldStates: App.initializeFieldStates()
    };
  }

  /**
   * increments the numberOfActiveFields by 1 and pushes the field to the array list activeFields
   * @param fieldValue as integer (e.g. for the field "46" we pass 46 as field value)
   */
  incrementActiveFields(fieldValue) {
    const numberOfActiveFields = this.state.numberOfActiveFields + 1;
    this.setState({numberOfActiveFields: numberOfActiveFields});
    let updatedActiveFields = this.state.activeFields;
    updatedActiveFields.push(fieldValue);
    this.setState({
      activeFields: updatedActiveFields
    });
  }

    /**
     * creates a fieldState object and sets the initial state of the fields to false
     */
    static initializeFieldStates() {
    let fieldStates = {};
    const numberOfFields = 49;

    for (let i = 0; i < numberOfFields; i++) {
      fieldStates['' + (i + 1)] = false;
    }

    return fieldStates;
  }

  /**
   * returns the fieldState for a specific field
   * @param field as integer (e.g. for the field "46" we pass 46 as field value)
   * @returns fieldState as boolean
   */
  getFieldState(field) {
    return this.state.fieldStates[field];
  }

  /**
   *
   * @param field as integer (e.g. for the field "46" we pass 46 as field value)
   * @param value as boolean (e.g. if the field is clicked "true" will be passed as the value)
   */
  modifyFieldState(field, value) {
    let newFieldStates = this.state.fieldStates;
    newFieldStates[field] = value;
    this.setState({
        fieldStates: newFieldStates
    });
  }

  /**
   * decrement the numberOfActiveFields by 1 and removes the field from the activeFields array list
   * @param fieldValue as integer (e.g. for the field "46" we pass 46 as field value)
   */
  decrementActiveFields(fieldValue) {
    const numberOfActiveFields = this.state.numberOfActiveFields - 1;
    this.setState({numberOfActiveFields: numberOfActiveFields});
    let updatedActiveFields = this.state.activeFields;
    let indexOfFieldValue = updatedActiveFields.indexOf(fieldValue);
    updatedActiveFields.splice(indexOfFieldValue, 1);
    this.setState({
      activeFields: updatedActiveFields
    });
  }

  /**
   * @returns the number of activeFields as a integer
   */
  getNumberOfActiveFields() {
    return this.state.numberOfActiveFields;
  }

  /**
   * resets the numberOfActiveFields, activeFields list, all the fieldStates
   * and removes clicked/disabled css classes from the fields
   */
  resetActiveFields() {
    const numberOfActiveFields = 0;
    const activeFields = [];
    this.setState({
      numberOfActiveFields: numberOfActiveFields,
      activeFields: activeFields,
      fieldStates: App.initializeFieldStates()
    });
    App.removeClickedDisabledCssClasses();
  }

    /**
     * removes the field-clicked and field-disabled classes to reset all the fields to the initial style
     */
    static removeClickedDisabledCssClasses() {
    const clickedFields = document.querySelectorAll('.game-field-container .field-clicked');
    const disabledFields = document.querySelectorAll('.game-field-container .field-disabled');
    for (let i = 0; i < clickedFields.length; i++) {
      clickedFields[i].classList.remove('field-clicked');
    }
    for (let i = 0; i < disabledFields.length; i++) {
      disabledFields[i].classList.remove('field-disabled');
    }
  }

  render() {
    let successButton;

    if (this.state.activeFields.length < 6) {
      successButton = '';
    } else {
      const orderedFields = this.state.activeFields.sort(function(a, b){return a-b});
      successButton = <SuccessButton fieldValues={orderedFields}/>;
    }
    return (
      <div className="game-wrapper">
        <Header title={'Ihr Spielfeld'} />
        <GameField
            incrementActiveFields={this.incrementActiveFields.bind(this)}
            decrementActiveFields={this.decrementActiveFields.bind(this)}
            getNumberOfActiveFields={this.getNumberOfActiveFields.bind(this)}
            getFieldState={this.getFieldState.bind(this)}
            modifyFieldState={this.modifyFieldState.bind(this)}
        />
        <div className="btn-wrapper">
          <button className={'btn btn-delete'} onClick={this.resetActiveFields.bind(this)}>Löschen</button>
          { successButton }
        </div>
      </div>
    );
  }
}

export default App;
