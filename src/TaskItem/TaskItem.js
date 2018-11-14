import style from './TaskItem.sass';
import React from 'react';
import moment from 'moment'; 

import { updateItem, deleteItem } from '../Services/TaskList.js';

export class TaskItem extends React.Component {

  constructor(params){
    super(params);
    this.state = {
      editMode:false
    }
  }

  componentDidUpdate(){
    if(this.state.editMode) this.refs.editNameField.select();
  }

  remove = () => {
    deleteItem(this.props.item);
  }

  enterEditMode = () => {
    this.setState({editMode: true});
  }

  editName = (event) => {
    if (event.keyCode === 13){
      updateItem({label: event.target.value, id: this.props.item.id}).then(e => {
        this.setState({editMode: false});
      });
    }
  }
  drag = (e) => {
    e.dataTransfer.setData('itemId', this.props.item.id);
    e.dropEffect = "move";
  }

  render(){

    const editNameField = <input 
      onKeyUp={this.editName} 
      defaultValue={this.props.item.label} 
      ref="editNameField"
    />

    const schedule = this.props.item.schedule.map(e => (
      <small key={e.id}>{e.startTime.format('h:mm MMM D')}</small>
    ));


    const taskView = <div>
      <div>
            { this.props.item.label }
      </div>
      <div className={style.schedule}>
        {schedule}
      </div>
    </div>

    return (
      <li className={style.TaskListItem}
        draggable="true"
        onDragStart={this.drag}
      >
        <div className={style.label} onClick={this.enterEditMode}>
          { this.state.editMode? editNameField : taskView }
        </div>
        <div className={style.itemHoverControls}>
          <button onClick={this.remove}>X</button>
        </div>
      </li>
    )
  }
}
