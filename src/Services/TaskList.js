
import moment from 'moment'; 

const subscriptions = [];

export async function getToDoList(){
  let list =  await serverMock.get();
  return (format.outbound(list));
}

export async function addItem(item){
  var item = await serverMock.addItem(format.inbound(item));
  publishUpdate('add', format.outbound(item));
  return item;
}

export async function updateItem(item){
  var item = await serverMock.updateItem(format.inbound(item));
  publishUpdate('update', format.outbound(item));
  return item;
}

export async function deleteItem(item){
  var item = await serverMock.deleteItem(format.inbound(item));
  publishUpdate('delete', format.outbound(item));
  return item;
}

export function subscribeForListUpdate(cb){
  subscriptions.push(cb);
}

function publishUpdate(type, ...params){
  subscriptions.forEach(e => e(type, ...params));
}

const format = {
  // convert task or tasklist schedule to unixTimeStamp
  // duplicates input (makes and returns a copy, (preserves original value))
  inbound(task){
    if (task.map) return task.map(format.inbound);

    if(task.schedule){
      task.schedule.forEach(e => {
        e.startTime = e.startTime.valueOf();
      });
    }

    return task;
  },

  // convert task or tasklist schedule to moment objects
  // mutilates input (changes original value)
  outbound(task){
    if (task.map) return task.map(format.outbound);

    if (task.schedule) {
      task.schedule.forEach(e => {
        e.startTime = moment(e.startTime);
      });
    }
    return task;
  }
}

var serverMock = (function(){
  function copy(v) {
    return JSON.parse(JSON.stringify(v))
  }
  var itemCache;
  return {
    async get(){
      itemCache = JSON.parse(localStorage.getItem('list')) || [];
      return copy(itemCache);
    },
    async addItem(item){
      do {
        item.id = Math.ceil(Math.random()*5000);
      }
      while(~itemCache.findIndex(e => e.id === item.id));

      itemCache.push(item);
      localStorage.setItem('list', JSON.stringify(itemCache));
      return copy(item);
    },
    async updateItem(item){
      let cachedItem = itemCache.find(e => e.id === item.id);

      for (let key in item)
        if (item.hasOwnProperty(key)) cachedItem[key] = item[key];

      // assign an id to each schedule item
      cachedItem.schedule.forEach(e => e.id = e.id || Math.ceil(Math.random()*5000));

      
      localStorage.setItem('list', JSON.stringify(itemCache));
      return copy(cachedItem);
    },
    async deleteItem(item){
      itemCache.splice(itemCache.findIndex(e => e.id === item.id), 1);
      localStorage.setItem('list', JSON.stringify(itemCache));
      return copy(item);
    }
  }
})();
