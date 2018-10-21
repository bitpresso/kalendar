import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8088/api';

export default {
  getEvents: (page, size, sort) => {
    const params = new URLSearchParams();
    if (page) {
      params.append('page', page);
    }
    if (size) {
      params.append('size', size);
    }
    if (sort) {
      params.append('sort', sort);
    }
    return axios.get(`/events?${params.toString()}`);
  },
  searchEventsByPeriod: (startDate, endDate) => {
    const start = startDate.toJSON();
    const end = endDate.toJSON();
    return axios.get(`/events/search/period?start=${start}&end=${end}`);
  },
};
