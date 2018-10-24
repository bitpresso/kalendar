
class Calendar {
  constructor(...args) {
    this.current = {};

    this.update(...args);
  }

  update(...args) {
    const date = (arguments.length === 0) ? new Date() : new Date(args[0], args[1] - 1, args[2]);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);
    const index = firstDate.getDay() + day;
    const week = Math.floor(index / 7);

    if (this.current.year !== year || this.current.month !== month) {
      this.monthly = Calendar.generateDays(year, month, firstDate, lastDate);
      this.weekly = Calendar.generateHours(this.monthly, week);
      this.current.week = week;
    }
    if (this.current.week !== week) {
      this.weekly = Calendar.generateHours(this.monthly, week);
      this.current.week = week;
    }
    this.current.year = year;
    this.current.month = month;
    this.current.day = day;
  }

  static haru(year, month, day, hour) {
    return {
      year,
      month,
      day,
      hour,
    };
  }

  static generateDays(year, month, firstDate, lastDate) {
    const dates = [];

    let offset;
    let index = 0;

    offset = firstDate.getDay() - 1;
    for (let day = -offset; day <= 0; day += 1, index += 1) {
      const prev = new Date(year, month - 1, day);
      dates[index] = Calendar.haru(prev.getFullYear(), prev.getMonth() + 1, prev.getDate());
    }

    offset = lastDate.getDate();
    for (let day = 1; day <= offset; day += 1, index += 1) {
      dates[index] = Calendar.haru(year, month, day);
    }

    offset = 7 - lastDate.getDay();
    for (let day = 1; day < offset; day += 1, index += 1) {
      dates[index] = Calendar.haru(year, month + 1, day);
    }

    return dates;
  }

  static generateHours(monthlyDays, week) {
    const dates = [];

    let index = 0;
    const days = monthlyDays.slice(7 * week, (7 * (week + 1)));
    for (let i = 0; i < 7; i += 1) {
      const date = days[i];
      for (let hour = 0; hour < 24; hour += 1, index += 1) {
        dates[index] = Calendar.haru(date.year, date.month, date.day, hour);
      }
    }

    const numOfWeeks = days.length / 7;
    for (let i = 0; i < numOfWeeks; i += 1) {
      dates.push();
    }

    return dates;
  }
}

export default Calendar;
