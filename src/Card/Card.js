
import React from 'react';

import style from './Card.sass';

export class Card extends React.Component {
  render(){
    let className = style.Card;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}
