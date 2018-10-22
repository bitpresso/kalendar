
const DEFAULT_TYPE = 'monthly';

export default class Calendar {
  static generateDaysOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const numOfWeeks = (lastDate.getDate() + firstDate.getDay() + (6 - lastDate.getDay())) / 7;
    const dates = [];

    for (let w = 0; w < numOfWeeks; w += 1) {
      const firstDayOfWeek = new Date(year, month, 1 + (7 * w));
      dates.push(...this.generateDaysOfWeek(firstDayOfWeek));
    }

    return dates;
  }

  static generateDaysOfWeek(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const dates = [];

    for (let i = dayOfWeek; i > 0; i -= 1) {
      const prevDate = new Date(year, month, day - i);
      prevDate.events = [];
      dates.push(prevDate);
    }
    const baseDate = date;
    baseDate.events = [];
    dates.push(baseDate);

    for (let i = 1; i < 7 - dayOfWeek; i += 1) {
      const nextDate = new Date(year, month, day + i);
      nextDate.events = [];
      dates.push(nextDate);
    }

    return dates;
  }

  static generateHoursOfDays(days = [], startHour = 0, endHour = 24) {
    const dates = [];

    for (let d = 0; d < days.length; d += 1) {
      const day = days[d];
      for (let hour = startHour; hour < endHour; hour += 1) {
        const date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour);
        date.events = [];
        dates.push(date);
      }
    }

    return dates;
  }

  constructor(currentDate, options) {
    this.options = options || {};

    if (!this.options.type) {
      this.options.type = DEFAULT_TYPE;
    }

    if (this.options.type === 'monthly') {
      this.dates = Calendar.generateDaysOfMonth(currentDate);
    }
    if (this.options.type === 'weekly') {
      const days = Calendar.generateDaysOfWeek(currentDate);
      this.dates = Calendar.generateHoursOfDays(days);
    }

    [this.startDate] = this.dates;
    this.endDate = this.dates[this.dates.length - 1];
  }

  includes(date) {
    return (this.startDate <= date) && (date <= this.endDate);
  }

  setEvent(event) {
    const eventStartDate = new Date(event.start);
    this.dates.forEach((date) => {
      if (date.toDateString() === eventStartDate.toDateString()) {
        if (this.options.type === 'monthly') {
          date.events.push(event);
        } else if (date.toTimeString() === eventStartDate.toTimeString()) {
          date.events.push(event);
        }
      }
    });
  }
}

window.Calendar = Calendar;
