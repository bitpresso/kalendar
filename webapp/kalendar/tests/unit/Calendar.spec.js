import Calendar from '../../src/Calendar';

function calendarTest(calendar, monthly, weekly) {
  const monthlyCalendar = calendar.monthly;
  expect(monthlyCalendar.length).toBe(monthly.length);
  expect(monthlyCalendar[0].toJSON()).toMatch(monthly.firstDate.toJSON());
  expect(monthlyCalendar[monthlyCalendar.length - 1].toJSON()).toMatch(monthly.lastDate.toJSON());

  const weeklyCalendar = calendar.weekly;
  expect(weeklyCalendar.length).toBe(weekly.length);
  expect(weeklyCalendar[0].toJSON()).toMatch(weekly.firstDate.toJSON());
  expect(weeklyCalendar[weeklyCalendar.length - 1].toJSON()).toMatch(weekly.lastDate.toJSON());
}

describe('Calendar', () => {
  it('new Calendar()', () => {
    const now = new Date();
    const calendar = new Calendar();

    const { date } = calendar.current;
    expect(date.getFullYear()).toBe(now.getFullYear());
    expect(date.getMonth()).toBe(now.getMonth());
    expect(date.getDate()).toBe(now.getDate());
  });

  it('new Calendar(new Date(2018, 9, 31))', () => {
    const calendar = new Calendar(new Date(2018, 9, 31));

    const { year, month, day } = calendar.current;
    expect(year).toBe(2018);
    expect(month).toBe(10);
    expect(day).toBe(31);

    const monthly = {
      length: 35,
      firstDate: new Date(2018, 8, 30),
      lastDate: new Date(2018, 10, 3),
    };
    const weekly = {
      length: 7,
      firstDate: new Date(2018, 9, 28),
      lastDate: new Date(2018, 10, 3),
    };
    calendarTest(calendar, monthly, weekly);
  });

  it('new Calendar(new Date(2018, 8, 30))', () => {
    const calendar = new Calendar(new Date(2018, 8, 30));

    const { year, month, day } = calendar.current;
    expect(year).toBe(2018);
    expect(month).toBe(9);
    expect(day).toBe(30);

    const monthly = {
      length: 42,
      firstDate: new Date(2018, 7, 26),
      lastDate: new Date(2018, 9, 6),
    };
    const weekly = {
      length: 7,
      firstDate: new Date(2018, 8, 30),
      lastDate: new Date(2018, 9, 6),
    };
    calendarTest(calendar, monthly, weekly);
  });

  it('moveToPrevMonth(new Date(2018, 2, 30))', () => {
    const date = Calendar.moveToPrevMonth(new Date(2018, 2, 30));
    expect(date.getFullYear()).toBe(2018);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(28);
  });

  it('moveToNextMonth(new Date(2018, 0, 31))', () => {
    const date = Calendar.moveToNextMonth(new Date(2018, 0, 31));
    expect(date.getFullYear()).toBe(2018);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(28);
  });

  it('moveToPrevWeek(new Date(2018, 9, 31))', () => {
    const date = Calendar.moveToPrevWeek(new Date(2018, 9, 31));
    expect(date.getFullYear()).toBe(2018);
    expect(date.getMonth()).toBe(9);
    expect(date.getDate()).toBe(24);
  });

  it('moveToNextWeek(new Date(2018, 9, 31))', () => {
    const date = Calendar.moveToNextWeek(new Date(2018, 9, 31));
    expect(date.getFullYear()).toBe(2018);
    expect(date.getMonth()).toBe(10);
    expect(date.getDate()).toBe(7);
  });
});
