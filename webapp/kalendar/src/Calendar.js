
class Calendar {
  constructor(date) {
    this.current = {};
    this.dates = [];
    this.indexes = {};
    this.monthly = [];
    this.weekly = [];

    this.update(date);
  }

  update(date) {
    const targetDate = date || new Date();
    if (this.current.date === targetDate) return;

    const target = Calendar.resolve(targetDate);
    if (this.current.year !== target.year || this.current.month !== target.month) {
      this.generate(target);
      this.monthly = Calendar.getMonthlyDates(this.dates);
      this.weekly = Calendar.getWeeklyDates(this.dates, target.week);
    }
    if (this.current.week !== target.week) {
      this.weekly = Calendar.getWeeklyDates(this.dates, target.week);
    }
    this.current = target;
  }

  generate(target) {
    const begin = 1 - target.first.getDay();
    const end = target.last.getDate() + (7 - target.last.getDay());
    let index = 0;

    this.dates = [];
    this.indexes = {};
    for (let day = begin; day < end; day += 1) {
      const date = new Date(target.year, target.month - 1, day, 0);
      this.dates[index] = date;
      this.indexes[date.toDateString()] = index;
      index += 1;
    }
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

  static getOffsetDate(date, offset) {
    const year = (!offset) ? 0 : offset.year || 0;
    const month = (!offset) ? 0 : offset.month || 0;
    const day = (!offset) ? 0 : offset.day || 0;
    const hour = (!offset) ? 0 : offset.hour || 0;
    const minute = (!offset) ? 0 : offset.minute || 0;
    const second = (!offset) ? 0 : offset.second || 0;
    return new Date(
      date.getFullYear() + year,
      date.getMonth() + month,
      date.getDate() + day,
      date.getHours() + hour,
      date.getMinutes() + minute,
      date.getSeconds() + second,
    );
  }

  static getCorrectedDate(date, correct) {
    const year = (!correct) ? undefined : correct.year;
    const month = (!correct) ? undefined : correct.month;
    const day = (!correct) ? undefined : correct.day;
    const hour = (!correct) ? undefined : correct.hour;
    const minute = (!correct) ? undefined : correct.minute;
    const second = (!correct) ? undefined : correct.second;
    return new Date(
      (year === undefined) ? date.getFullYear() : year,
      (month === undefined) ? date.getMonth() : month - 1,
      (day === undefined) ? date.getDate() : day,
      (hour === undefined) ? date.getHours() : hour,
      (minute === undefined) ? date.getMinutes() : minute,
      (second === undefined) ? date.getSeconds() : second,
    );
  }

  static moveToPrevMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    const prevDay = (day < lastDayOfPrevMonth) ? day : lastDayOfPrevMonth;
    return new Date(year, month - 1, prevDay);
  }

  static moveToNextMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const lastDayOfNextMonth = new Date(year, month + 2, 0).getDate();
    const nextDay = (day < lastDayOfNextMonth) ? day : lastDayOfNextMonth;
    return new Date(year, month + 1, nextDay);
  }

  static moveToPrevWeek(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
  }

  static moveToNextWeek(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  }
}

export default Calendar;
