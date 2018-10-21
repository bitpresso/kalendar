import EventService from '@/services/EventService';

describe('event API service', () => {
  it('getEvents()', () => {
    return EventService.getEvents().then((response) => {
      const { events } = response.data._embedded;
      expect(events.length).toBe(19);
    });
  });
  it('getEvents(page, size, sort)', () => {
    return EventService.getEvents(0, 10).then((response) => {
      const { events } = response.data._embedded;
      expect(events.length).toBe(10);
    });
  });
  it('searchEventsByPeriod(startDate, endDate)', () => {
    const startDate = new Date(2018, 8, 16, 11);
    const endDate = new Date(2018, 8, 16, 15);
    return EventService.searchEventsByPeriod(startDate, endDate).then((response) => {
      const { events } = response.data._embedded;
      expect(events.length).toBe(5);
    });
  });
});
