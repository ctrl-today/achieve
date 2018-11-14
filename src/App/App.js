import React from 'react';

import style from './App.sass';

import { TaskList } from '../TaskList/TaskList'
import { Calendar } from '../Calendar/Calendar'
import { Sidebar } from '../Sidebar/Sidebar'
import { Card } from '../Card/Card'

import { getToDoList, subscribeForListUpdate } from '../Services/TaskList.js';

export class App extends React.Component {
  constructor(props){
    super(props);
    subscribeForListUpdate(this.updateHandle);
    this.state = { list: [] };
  }
  updateHandle = (type, ...params) => {
    switch (type) {
      case "add": {
        this.state.list.push(params[0]);
        this.setState(this.state);
        break;
      }
      case "update": {
        this.state.list.splice(this.state.list.findIndex(e => e.id === params[0].id), 1, params[0]);
        this.setState(this.state);
        break;
      }
      case "delete": {
        this.state.list.splice(this.state.list.findIndex(e => e.id === params[0].id), 1);
        this.setState(this.state);
        break;
      }
    }
  }
  async componentDidMount(){
    const list = await getToDoList();
    this.setState({list});
  }
  render(){
    return (
      <div className={style.App}>
        <div className={style.corpus}>
          <Card className={style.tasklist}><TaskList list={this.state.list} /></Card>
          <Card className={style.calendar}><Calendar list={this.state.list} /></Card>
        </div>
      </div>
    )
  }
}
