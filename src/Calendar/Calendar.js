import React from 'react';
import moment from 'moment';

import style from './Calendar.sass';

import { DateSelector } from '../DateSelector/DateSelector'
import { Schedule } from '../Schedule/Schedule'

export class Calendar extends React.Component {
  constructor(params){
    super(params);
    this.state = {
      selectedDate: moment(),
      currentDate: moment()
    }
  }
  setDate = (date) => {
    this.setState({selectedDate: date});
  }
  render(){
    return (
      <div className={style.Calendar}>
        <DateSelector 
          selectedDate={this.state.selectedDate} 
          currentDate={this.state.currentDate} 
          setDate={this.setDate}
        />
        <Schedule list={this.props.list} selectedDate={this.state.selectedDate}/>
      </div>
    )
  }
}
