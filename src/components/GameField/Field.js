import React from 'react';

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isActivated: false};
  }

  handleFieldActivated(event) {
    const fieldValue = event.target.innerText;
    //console.log(this.state.isActivated);
    //console.log(this.props.getNumberOfActiveFields());
    this.setState({isActivated: true});
    this.props.incrementActiveFields(fieldValue);
  }

  static resetStates() {
    console.log('reset');
    const clickedFields = document.querySelectorAll('.game-field-container .field-clicked');
    console.log(clickedFields);
  }

  handleFieldDeactivated(event) {
    const fieldValue = event.target.innerText;
    this.setState({isActivated: false});
    this.props.decrementActiveFields(fieldValue);
  }

  fieldValue = this.props.fieldValue;
  render() {
    const isActivated = this.state.isActivated;
    const numberOfActiveFields = this.props.getNumberOfActiveFields();
    if (isActivated && numberOfActiveFields === 0) {
      //this.resetAllStates();
    }
    let fieldContent;

    if (isActivated) {
      fieldContent = <div onClick={this.handleFieldDeactivated.bind(this)} className={'game-fields field-clicked'}>
        { this.fieldValue }
      </div>;
    } else {
      if (numberOfActiveFields > 5) {
        fieldContent = <div className={'game-fields field-disabled'}>
          { this.fieldValue }
        </div>;
      } else {
        fieldContent = <div onClick={this.handleFieldActivated.bind(this)} className={'game-fields'}>
          { this.fieldValue }
        </div>;
      }
    }

    return (
        <div>
          {fieldContent}
        </div>
    );
  }
}
