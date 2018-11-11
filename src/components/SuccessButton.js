import React from 'react';

export default class SuccessButton extends React.Component {
  alertFieldValues() {
    console.log(this.fieldValues);
    alert(this.fieldValues);
  }
  fieldValues = this.props.fieldValues;
  render() {
    return (
        <button className={'btn btn-success'} onClick={this.alertFieldValues.bind(this)}>Weiter</button>
    );
  }
}
