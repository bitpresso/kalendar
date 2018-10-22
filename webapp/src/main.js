import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Kalendar from './kalendar/src';
import './kalendar/styles/default.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Kalendar);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
