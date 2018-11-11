import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
        <div className="game-header">
          {this.props.title}
        </div>
    );
  }
}
