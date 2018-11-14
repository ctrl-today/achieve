import React from 'react';

import style from './AgendaItem.sass';

import { timeSlotOffset } from '../Services/TimeConversions';

export class AgendaItem extends React.Component {

  drag = (e) => {
    e.dataTransfer.setData('itemId', this.props.agenda.id);
    e.dataTransfer.setData('scheduleId', this.props.schedule.id);
    e.dataTransfer.setData('origin', 'AgendaItem');
    e.dropEffect = "move";
  }

  render(){
    return (
      <div 
        className={style.AgendaItem}
        style={{top:timeSlotOffset(this.props.schedule.startTime, this.props.timeSlots)}} 
        draggable="true"
        onDragStart={this.drag}
      >
        { this.props.agenda.label } - { this.props.schedule.startTime.format("hh:mm") }
      </div>
    )
  }
}
