import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';
import Kalendar from '../kalendar/src';
import '../kalendar/styles/default.css';
import services from './services';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Kalendar);
Vue.use(services, {
  baseURL: `${window.location.protocol}//${window.location.hostname}:8088/api`,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
