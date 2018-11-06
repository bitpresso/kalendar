import axios from 'axios';
import EventService from './EventService';

export default {
  install: (Vue, options) => {
    const client = axios.create(options);

    Vue.prototype.$service = {  // eslint-disable-line
      event: new EventService(client),
    };
  },
};
