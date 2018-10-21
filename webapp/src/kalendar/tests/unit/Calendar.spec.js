import Calendar from '../../src/Calendar';

describe('Calendar', () => {
  const now = new Date(2018, 9, 19);

  it('static generateDaysOfMonth()', () => {
    const days = Calendar.generateDaysOfMonth(now);
    expect(days.length).toBe(35);
    expect(days[0]).toEqual(new Date(2018, 8, 30));
    expect(days[days.length - 1]).toEqual(new Date(2018, 10, 3));
  });

  it('static generateDaysOfWeek()', () => {
    const days = Calendar.generateDaysOfWeek(now);
    expect(days.length).toBe(7);
    expect(days[0].getDate()).toBe(14);
    expect(days[6].getDate()).toBe(20);
  });

  it('static generateHoursOfDays()', () => {
    const days = Calendar.generateDaysOfWeek(now);
    const hours = Calendar.generateHoursOfDays(days);
    expect(hours.length).toBe(7 * 24);
    expect(hours[0].getHours()).toBe(0);
    expect(hours[hours.length - 1].getHours()).toBe(23);
  });

  it('create instance: new Calendar(date)', () => {
    const monthly = new Calendar(now);
    expect(monthly.options.type).toMatch('monthly');
    expect(monthly.selectedDate.toISOString()).toBe(now.toISOString());
    expect(monthly.days.length).toBe(35);
    expect(monthly.hours).toBeUndefined();
  });

  it('create instance: Calendar.weekly(date)', () => {
    const weekly = Calendar.weekly(now);
    expect(weekly.options.type).toMatch('weekly');
    expect(weekly.selectedDate.toISOString()).toBe(now.toISOString());
    expect(weekly.days.length).toBe(7);
    expect(weekly.hours.length).toBe(7 * 24);
  });

  it('includes(date)', () => {
    const weekly = Calendar.weekly(now);
    expect(weekly.includes(new Date(2018, 9, 13))).toBeFalsy();
    expect(weekly.includes(new Date(2018, 9, 14))).toBeTruthy();
    expect(weekly.includes(new Date(2018, 9, 17))).toBeTruthy();
    expect(weekly.includes(new Date(2018, 9, 20))).toBeTruthy();
    expect(weekly.includes(new Date(2018, 9, 21))).toBeFalsy();
  });
});
