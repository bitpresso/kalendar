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
        <kalendar-monthly :dates="calendar.monthly" @update:current="updateCurrent"></kalendar-monthly>
      </div>
      <div v-else>
        <kalendar-weekly :dates="calendar.weekly" @update:current="updateCurrent"></kalendar-weekly>
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
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
    openDatePicker: {
      type: Function,
      default: () => window.alert('not found DatePicker'),
    },
  },
  data() {
    return {
      monthlyView: true,
      calendar: new Calendar(),
    };
  },
  computed: {
    currentDateString() {
      const { year, month, day } = this.calendar.current;
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString();
    },
  },
  methods: {
    toggleView() {
      this.monthlyView = !this.monthlyView;
    },
    updateCurrent(current) {
      const { year, month, day } = current;
      this.calendar.update(year, month, day);
      console.log(this.calendar.weekly);
      this.$emit('input', new Date(year, month - 1, day));
    },
  },
  mounted() {
    if (this.value) {
      const year = this.value.getFullYear();
      const month = this.value.getMonth() + 1;
      const day = this.value.getDate();
      this.calendar = new Calendar(year, month, day);
    }
  },
};
</script>

<style scoped>
.kalendar-toolbar {
  width: 100%;
}
</style>
