import Calendar from '../../src/Calendar';

function calendarTest(calendar, monthly, weekly) {
  const monthlyCalendar = calendar.monthly;
  expect(monthlyCalendar.length).toBe(monthly.length);
  expect(monthlyCalendar[0].month).toBe(monthly.firstDay.month);
  expect(monthlyCalendar[0].day).toBe(monthly.firstDay.day);
  expect(monthlyCalendar[monthlyCalendar.length - 1].month).toBe(monthly.lastDay.month);
  expect(monthlyCalendar[monthlyCalendar.length - 1].day).toBe(monthly.lastDay.day);

  const weeklyCalendar = calendar.weekly;
  expect(weeklyCalendar.length).toBe(weekly.length);
  expect(weeklyCalendar[0].month).toBe(weekly.firstDay.month);
  expect(weeklyCalendar[0].day).toBe(weekly.firstDay.day);
  expect(weeklyCalendar[weeklyCalendar.length - 1].month).toBe(weekly.lastDay.month);
  expect(weeklyCalendar[weeklyCalendar.length - 1].day).toBe(weekly.lastDay.day);
}

describe('Calendar', () => {
  it('new Calendar()', () => {
    const now = new Date();
    const calendar = new Calendar();

    const { year, month, day } = calendar.current;
    expect(year).toBe(now.getFullYear());
    expect(month).toBe(now.getMonth() + 1);
    expect(day).toBe(now.getDate());
  });

  it('new Calendar(year, month, day)', () => {
    const calendar = new Calendar(2018, 10, 31);

    const { year, month, day } = calendar.current;
    expect(year).toBe(2018);
    expect(month).toBe(10);
    expect(day).toBe(31);

    const monthly = {
      length: 35,
      firstDay: { month: 9, day: 30 },
      lastDay: { month: 11, day: 3 },
    };
    const weekly = {
      length: 7 * 24,
      firstDay: { month: 10, day: 28 },
      lastDay: { month: 11, day: 3 },
    };
    calendarTest(calendar, monthly, weekly);
  });

  it('new Calendar(year, month, day)', () => {
    const calendar = new Calendar(2018, 9, 30);

    const { year, month, day } = calendar.current;
    expect(year).toBe(2018);
    expect(month).toBe(9);
    expect(day).toBe(30);

    const monthly = {
      length: 42,
      firstDay: { month: 8, day: 26 },
      lastDay: { month: 10, day: 6 },
    };
    const weekly = {
      length: 7 * 24,
      firstDay: { month: 9, day: 30 },
      lastDay: { month: 10, day: 6 },
    };
    calendarTest(calendar, monthly, weekly);
  });
});
