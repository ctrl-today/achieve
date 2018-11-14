import React from 'react';
import moment from 'moment'; 

import style from './DateSelector.sass';

import { getDaysInMonth } from '../Services/TimeConversions';

export class DateSelector extends React.Component {
  constructor(props){
    super(props);
  }
  scrollers = {
    scrollingDays:{
      interval: false,
      offset: 0
    },
    scrollingMonths: {
      interval: false,
      offset: 0
    }
  }
  componentDidMount(){
    this.setScrollerOffset('scrollingDays', -((this.props.selectedDate.date()-2)*35));
    //this.setScrollerOffset('scrollingMonths', -((this.props.selectedDate.month()-2)*48))
  }
  setDate(){
    this.props.setDate(this.props.selectedDate);
  }
  setDay(day){
    this.props.selectedDate.date(day);
    this.setDate();
  }
  setScrollerOffset(scroller, offset){
    this.scrollers[scroller].offset = offset;
    this.refs[scroller].style.transform = `translate(${offset}px)`;
  }
  setMonth(month){
    this.props.selectedDate.month(month);
    this.setDate();
  }
  scroller = (type) => {
    return e => {
      let boundingBox = e.currentTarget.getBoundingClientRect();
      let delta = 10;
      // scroll left
      if(e.clientX - boundingBox.left < 50) {
          if (!this.scrollers[type].interval){
            this.scrollers[type].interval = setInterval(() => {
              let newOffset = this.scrollers[type].offset+delta
              if(newOffset >= 5) this.clearInt(type);
              else this.setScrollerOffset(type, newOffset);
            }, 50)
          }
      }
      // scroll right
      else if (boundingBox.right - e.clientX < 50) {
          if (!this.scrollers[type].interval){
            const rightScrollOffsetMax = -((this.refs[type].children.length * this.refs[type].firstChild.getBoundingClientRect().width) - boundingBox.width + 10);
            this.scrollers[type].interval = setInterval(() => {
              let newOffset = this.scrollers[type].offset - delta;
              if(newOffset <= rightScrollOffsetMax) this.clearInt(type);
              else this.setScrollerOffset(type, newOffset);
            }, 50);
          }
      }
      // clear scroll
      else if (this.scrollers[type].interval) {
        this.clearInt(type);
      }
    }
  }
  clearInt = (intLabel) => {
    clearInterval(this.scrollers[intLabel].interval);
    this.scrollers[intLabel].interval = false;
  }
  render(){

    const monthsInYear = moment.monthsShort().map(e =>{
      let selected;

      if (this.props.selectedDate.format('MMM') === e) selected = style.selectedDate;
      else if (this.props.currentDate.format('MMM') === e) selected = style.currentDate;

      return (<button key={e} className={selected} onClick={this.setMonth.bind(this, e)}>{e}</button>)
    });

    const daysInMonth = getDaysInMonth(this.props.selectedDate).map(e => {
      let selected;
      if (this.props.selectedDate.startOf('day').valueOf() === e.startOf('day').valueOf()) selected = style.selectedDate;
      else if (this.props.currentDate.startOf('day').valueOf() === e.startOf('day').valueOf()) selected = style.currentDate;

      return (<button key={e.valueOf()} className={selected} 
        onClick={this.setDay.bind(this, e.date())}
        ><small>{e.format('ddd')}</small>{e.format('DD')}</button>
      )
    });

    return (
      <div className={style.DateSelector}>
        <div className={style.months}
          onMouseMove={this.scroller('scrollingMonths')}
          onMouseOut={this.clearInt.bind(this, 'scrollingMonths')}
        >
          <div ref="scrollingMonths">{monthsInYear}</div>
        </div>
        <div className={style.days}
          onMouseMove={this.scroller('scrollingDays')}
          onMouseOut={this.clearInt.bind(this, 'scrollingDays')}
        >
          <div ref="scrollingDays" >{daysInMonth}</div>
        </div>
      </div>
    );
  }
}
