import React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import style from './Schedule.sass';

import { ScheduleDay } from '../ScheduleDay/ScheduleDay';

export class Schedule extends React.Component {

  componentDidMount(){
    new PerfectScrollbar(this.refs.Schedule)
  }

  render(){
    return (
      <div ref="Schedule" className={style.Schedule}>
        <ScheduleDay list={this.props.list} selectedDate={this.props.selectedDate}/>
      </div>
    )
  }
}
