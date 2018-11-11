import React from 'react';

export default class Field extends React.Component {
    /**
     * sets the field state to true after the field was clicked and increments the numberOfActiveFields by 1
     * @param event
     */
  handleFieldActivated(event) {
    const fieldValue = event.target.innerText;
    this.props.modifyFieldState(fieldValue, true);
    this.props.incrementActiveFields(fieldValue);
  }

    /**
     * sets the field state to false after the field was clicked and decrements the numberOfActiveFields by 1
     * @param event
     */
  handleFieldDeactivated(event) {
    const fieldValue = event.target.innerText;
    this.props.modifyFieldState(fieldValue, false);
    this.props.decrementActiveFields(fieldValue);
  }

  fieldValue = this.props.fieldValue;
  render() {
    const isActivated = this.props.getFieldState(this.fieldValue);
    const numberOfActiveFields = this.props.getNumberOfActiveFields();
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
