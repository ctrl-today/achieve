import moment from 'moment';

export function getDayTimeSlots({
  slotLength=30,
  slotUnit='minutes',
  date=moment()
} = {}){
  const slots = [];
  const track = moment(date).startOf('day');
  const endOfDay = moment(date).endOf('day');

  do {
    slots.push(moment(track));
    track.add(slotLength, slotUnit)
  }
  while (track.isSameOrBefore(endOfDay));
  
  return slots;
}

export function getDaysInMonth(month) {
  const arrDays = [];
  month = month || moment();
  let daysInMonth = month.daysInMonth();

  while(daysInMonth) {
    let current = moment().year(month.year()).month(month.month()).date(daysInMonth);
    arrDays.unshift(current);
    daysInMonth--;
  }

  return arrDays;
}

export function timeSlotOffset(time, slots){
  let index = slots.findIndex(slot => time.isBefore(slot));
  if (index === -1) index = slots.length;
  return (index-1)*50; // TODO: dynamic size ( don't assume 50 px )
}
