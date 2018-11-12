
export default class EventService {
  constructor(client) {
    this.client = client;
  }

  static convert(data) {
    return {
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
      href: data._links.self.href, // eslint-disable-line
    };
  }

  getEventsByRange(start, end) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('start', (start instanceof Date) ? start.toJSON() : start);
      params.append('end', (end instanceof Date) ? end.toJSON() : end);
      const url = `/events/search/range?${params.toString()}`;

      this.client.get(url).then((response) => {
        const { events } = response.data._embedded; // eslint-disable-line
        resolve(events.map(event => EventService.convert(event)));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  postEvent(event) {
    return new Promise((resolve, reject) => {
      const url = '/events';

      const body = {
        title: event.title,
        start: event.start.toJSON(),
        end: event.end.toJSON(),
      };

      this.client.post(url, body).then((response) => {
        resolve(EventService.convert(response.data));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  patchEvent(event) {
    return new Promise((resolve, reject) => {
      const url = event.href;

      const body = {};
      if (event.title) {
        body.title = event.title;
      }
      if (event.start) {
        body.start = event.start.toJSON();
      }
      if (event.end) {
        body.end = event.end.toJSON();
      }

      this.client.patch(url, body).then((response) => {
        resolve(EventService.convert(response.data));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  deleteEvent(event) {
    return new Promise((resolve, reject) => {
      const url = event.href;

      this.client.delete(url).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
