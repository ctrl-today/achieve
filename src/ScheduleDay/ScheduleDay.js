import React from 'react';

import style from './ScheduleDay.sass';

import { getDayTimeSlots } from '../Services/TimeConversions';
import { getToDoList } from '../Services/TaskList.js';

import { updateItem } from '../Services/TaskList.js';


export class ScheduleDay extends React.Component {
  dragover = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "#ACEDED";
    e.dataTransfer.dropEffect = 'move';
  }
  dragleave = (e) => {
    e.target.style.backgroundColor = "white";
  }
  drop = (timeSlot, e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "white";

    let task = this.props.list.find(x => x.id === parseInt(e.dataTransfer.getData('itemId')));

    task.schedule.push({
      id: Math.random()*50000,
      startTime: timeSlot.valueOf()
    });

    updateItem(task);

  }
  render(){
    const endOfDay = this.props.selectedDate.endOf('day').valueOf();
    const startOfDay = this.props.selectedDate.startOf('day').valueOf();
    const dom = {};

    const timeSlots = getDayTimeSlots({slotLength:30, date:this.props.selectedDate});

    // list of tasks that have time scheduled during the selectedDate
    const agenda = this.props.list.filter(l => l.schedule.some( s => {
      return s.startTime.isSame(this.props.selectedDate, 'day');
    }));


    // 48 time slots, one for every half hour
    dom.timeSlots = timeSlots.map(e => (
      <div 
        key={+e} 
        className={style.dayTimeSlot}
        onDragOver={this.dragover}
        onDragLeave={this.dragleave}
        onDrop={this.drop.bind(this, e)}
      >
        {e.format('hh:mm a')}
      </div>
    ));

    dom.agenda = [].concat(...agenda.map(e => e.schedule.map(x => (
      <div 
        key={Math.random()*50000}
        style={{top:timeSlotOffset(x.startTime, timeSlots)}}
        className={style.agendaItem}
      >
        { e.label } - { x.startTime.format("hh:mm") }
      </div>
    ))));

    return (
      <div className={style.ScheduleDay}>
        { dom.agenda }
        { dom.timeSlots }
      </div>
    )
  }
}

// TODO: move this into time conversions
function timeSlotOffset(time, slots){
  let index = slots.findIndex(slot => time.isBefore(slot));
  if (index === -1) index = slots.length;
  return (index-1)*50;
}
