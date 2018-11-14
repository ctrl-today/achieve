import style from './TaskInput.sass';
import React from 'react';

import { addItem } from '../Services/TaskList.js';

export class TaskListInput extends React.Component {

  sendItem = () => {
    const label = this.refs.listInput.value.trim();
    if (label.length) {
      addItem({
        label,
        schedule: []
      });
      this.refs.listInput.value = "";
    }
    this.refs.listInput.focus();
  }

  inputKeypress = (event) => {
    if (event.keyCode === 13) this.sendItem();
  }

  render(){
    return (
      <div className={style.TaskInput}>
        <input type="text" ref="listInput" onKeyUp={this.inputKeypress} />
        <button onClick={this.sendItem}>Submit</button>
      </div>
    ) 
  }
}
