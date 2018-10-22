import Calendar from '../../src/Calendar';

describe('Calendar', () => {
  const now = new Date(2018, 9, 19);

  it('static generateDaysOfMonth()', () => {
    const dates = Calendar.generateDaysOfMonth(now);
    expect(dates.length).toBe(35);
    expect(dates[0]).toEqual(new Date(2018, 8, 30));
    expect(dates[dates.length - 1]).toEqual(new Date(2018, 10, 3));
  });

  it('static generateDaysOfWeek()', () => {
    const dates = Calendar.generateDaysOfWeek(now);
    expect(dates.length).toBe(7);
    expect(dates[0].getDate()).toBe(14);
    expect(dates[6].getDate()).toBe(20);
  });

  it('static generateHoursOfDays()', () => {
    const days = Calendar.generateDaysOfWeek(now);
    const dates = Calendar.generateHoursOfDays(days);
    expect(dates.length).toBe(7 * 24);
    expect(dates[0].getHours()).toBe(0);
    expect(dates[dates.length - 1].getHours()).toBe(23);
  });

  it('create instance: new Calendar(date, { type: monthly })', () => {
    const monthly = new Calendar(now);
    expect(monthly.options.type).toMatch('monthly');
    expect(monthly.dates.length).toBe(35);
  });

  it('create instance: new Calendar(date, { type: weekly })', () => {
    const weekly = new Calendar(now, {
      type: 'weekly',
    });
    expect(weekly.options.type).toMatch('weekly');
    expect(weekly.dates.length).toBe(7 * 24);
  });

  it('includes(date)', () => {
    const weekly = new Calendar(new Date(2018, 9, 15), {
      type: 'weekly',
    });
    expect(weekly.includes(new Date(2018, 9, 13))).toBeFalsy();
    expect(weekly.includes(new Date(2018, 9, 14))).toBeTruthy();
    expect(weekly.includes(new Date(2018, 9, 17))).toBeTruthy();
    expect(weekly.includes(new Date(2018, 9, 20))).toBeTruthy();
    expect(weekly.includes(new Date(2018, 9, 21))).toBeFalsy();
  });
});
