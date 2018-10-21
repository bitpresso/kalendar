
const DEFAULT_TYPE = 'monthly';

export default class Calendar {
  static weekly(date, startHour = 0, endHour = 23) {
    return new Calendar(date, {
      type: 'weekly',
      startHour,
      endHour,
    });
  }

  static generateDaysOfMonth(baseDate) {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const numOfWeeks = (lastDate.getDate() + firstDate.getDay() + (6 - lastDate.getDay())) / 7;
    const days = [];

    for (let w = 0; w < numOfWeeks; w += 1) {
      const date = new Date(year, month, 1 + (7 * w));
      days.push(...this.generateDaysOfWeek(date));
    }

    return days;
  }

  static generateDaysOfWeek(baseDate) {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    const dayOfWeek = baseDate.getDay();
    const days = [];

    for (let i = dayOfWeek; i > 0; i -= 1) {
      const prevDate = new Date(year, month, day - i);
      days.push(prevDate);
    }
    days.push(baseDate);
    for (let i = 1; i < 7 - dayOfWeek; i += 1) {
      const nextDate = new Date(year, month, day + i);
      days.push(nextDate);
    }

    return days;
  }

  static generateHoursOfDays(days = [], startHour = 0, endHour = 24) {
    const hours = [];

    for (let d = 0; d < days.length; d += 1) {
      const date = days[d];
      for (let hour = startHour; hour < endHour; hour += 1) {
        hours.push(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour));
      }
    }

    return hours;
  }

  constructor(date, options) {
    this.selectedDate = date;
    this.options = options || {
      type: DEFAULT_TYPE,
    };

    if (!this.options.type) {
      this.options.type = DEFAULT_TYPE;
    }

    if (this.options.type === 'monthly') {
      this.days = Calendar.generateDaysOfMonth(date);
    }
    if (this.options.type === 'weekly') {
      this.days = Calendar.generateDaysOfWeek(date);
      this.hours = Calendar.generateHoursOfDays(this.days);
    }
  }

  includes(date) {
    return (date >= this.days[0]) && (date <= this.days[this.days.length - 1]);
  }
}

window.Calendar = Calendar;
