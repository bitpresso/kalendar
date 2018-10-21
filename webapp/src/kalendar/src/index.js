import KalendarDay from './components/KalendarDay.vue';
import KalendarHour from './components/KalendarHour.vue';
import KalendarMonthlyBody from './components/KalendarMonthlyBody.vue';
import KalendarWeeklyBody from './components/KalendarWeeklyBody.vue';

export const components = [
  KalendarDay,
  KalendarHour,
  KalendarMonthlyBody,
  KalendarWeeklyBody,
];

export default {
  install: (Vue) => {
    components.forEach(component => Vue.component(component.name, component));
  },
};
