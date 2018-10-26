<template>
  <div class="kalendar">
    <div class="kalendar-toolbar" style="position: fixed;">
      K:alendar
      <button class="kalendar-date-picker" @click="openDatePicker">{{currentDateString}}</button>
      <div class="kalendar-toggle" @click="toggleView">
        <button class="kalendar-toggle-item" :class="{ active: monthlyView }">Monthly</button>
        <button class="kalendar-toggle-item" :class="{ active: !monthlyView }">Weekly</button>
      </div>
    </div>
    <div class="kalendar-toolbar"></div>
    <div class="kalendar-content">
      <div v-if="monthlyView">
        <kalendar-monthly
          :dates="calendar.monthly"
          @update:date="updateCurrentDate"
        ></kalendar-monthly>
      </div>
      <div v-else>
        <kalendar-weekly
          :dates="calendar.weekly"
          @update:date="updateCurrentDate"
        ></kalendar-weekly>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '../Calendar';
import KalendarMonthly from './KalendarMonthly.vue';
import KalendarWeekly from './KalendarWeekly.vue';

export default {
  components: {
    KalendarMonthly,
    KalendarWeekly,
  },
  model: {
    prop: 'currentDate',
    event: 'update',
  },
  props: {
    currentDate: {
      type: Date,
      default: () => new Date(),
    },
    openDatePicker: {
      type: Function,
      default: () => console.log('not found DatePicker'),
    },
  },
  data() {
    return {
      monthlyView: true,
      calendar: new Calendar(this.currentDate),
    };
  },
  computed: {
    currentDateString() {
      return this.currentDate.toLocaleDateString();
    },
  },
  watch: {
    currentDate(newCurrentDate) {
      this.updateCurrentDate(newCurrentDate);
    },
  },
  methods: {
    toggleView() {
      this.monthlyView = !this.monthlyView;
    },
    updateCurrentDate(date) {
      this.calendar.update(date);
      this.$emit('update', date);
    },
  },
};
</script>

<style scoped>
.kalendar-toolbar {
  width: 100%;
}
</style>
