import React, { Component } from 'react';
import './App.css';

import GameField from './components/GameField';
import Header from './components/Header';
import SuccessButton from "./components/SuccessButton";
import Field from "./components/GameField/Field";

class App extends Component {
  constructor() {
    super();
    //TODO: add child states
    this.state = {
      numberOfActiveFields: 0,
      activeFields: [],
      childStates: []
    };
  }

  incrementActiveFields(fieldValue) {
    const numberOfActiveFields = this.state.numberOfActiveFields + 1;
    this.setState({numberOfActiveFields: numberOfActiveFields});
    let updatedActiveFields = this.state.activeFields;
    updatedActiveFields.push(fieldValue);
    this.setState({
      activeFields: updatedActiveFields
    });
  }

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

  getNumberOfActiveFields() {
    return this.state.numberOfActiveFields;
  }

  resetActiveFields() {
    const numberOfActiveFields = 0;
    const activeFields = [];
    this.setState({
      numberOfActiveFields: numberOfActiveFields,
      activeFields: activeFields
    }, function() {
      //console.log(numberOfActiveFields);
      //console.log(activeFields);
      const clickedFields = document.querySelectorAll('.game-field-container .field-clicked');
      const disabledFields = document.querySelectorAll('.game-field-container .field-disabled');
      Field.resetStates();
      for (let i = 0; i < clickedFields.length; i++) {
        clickedFields[i].classList.remove('field-clicked');
      }
      for (let i = 0; i < disabledFields.length; i++) {
        disabledFields[i].classList.remove('field-disabled');
      }
      //console.log(document.querySelectorAll('.game-field-container'))
    });
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
