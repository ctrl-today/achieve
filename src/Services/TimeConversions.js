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
