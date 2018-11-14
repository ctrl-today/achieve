import style from './TaskList.sass';
import React from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import { TaskListInput } from '../TaskInput/TaskInput';
import { TaskItem } from '../TaskItem/TaskItem';

export class TaskList extends React.Component {
  constructor(params){
    super(params);
  }

  componentDidMount(){
    new PerfectScrollbar(this.refs.list)
  }

  render(){
    const taskList = this.props.list.map((e, i) => (
      <TaskItem key={e.id} item={e} />
    ));

    return (
      <div className={style.TaskList}>
        <TaskListInput />
        <ul ref="list">
          {taskList}
        </ul>
      </div>
    )
  }
}
