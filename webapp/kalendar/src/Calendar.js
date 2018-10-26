
class Calendar {
  constructor(date) {
    this.current = {};
    this.dates = [];
    this.monthly = [];
    this.weekly = [];

    this.update(date);
  }

  update(date) {
    const targetDate = date || new Date();
    if (this.current.date === targetDate) return;

    const target = Calendar.resolve(targetDate);
    if (this.current.year !== target.year || this.current.month !== target.month) {
      this.dates = Calendar.generate(target);
      this.monthly = Calendar.getMonthlyDates(this.dates);
      this.weekly = Calendar.getWeeklyDates(this.dates, target.week);
    }
    if (this.current.week !== target.week) {
      this.weekly = Calendar.getWeeklyDates(this.dates, target.week);
    }
    this.current = target;
  }

  static generate(target) {
    const dates = [];

    const begin = 1 - target.first.getDay();
    const end = target.last.getDate() + (7 - target.last.getDay());
    let index = 0;
    for (let day = begin; day < end; day += 1) {
      const date = new Date(target.year, target.month - 1, day, 0);
      const times = [date];
      for (let hour = 1; hour < 24; hour += 1) {
        times[hour] = new Date(target.year, target.month - 1, day, hour);
      }
      date.times = times;
      dates[index] = date;
      index += 1;
    }

    return dates;
  }

  static resolve(date) {
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const first = new Date(year, month, 1);
      const last = new Date(year, month + 1, 0);
      const index = first.getDay() + (day - 1);
      const week = Math.floor(index / 7);

      return {
        date,
        year,
        month: month + 1,
        day,
        first,
        last,
        index,
        week,
      };
    }
    return null;
  }

  static getMonthlyDates(dates) {
    return dates;
  }

  static getWeeklyDates(dates, week) {
    return dates.slice(7 * week, 7 * (week + 1));
  }
}

export default Calendar;
