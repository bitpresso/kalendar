<template>
  <div class="kalendar-monthly-body" v-if="calendar">
    <kalendar-day v-for="(date, index) in calendar.dates"
      :key="`D#${date.toJSON()}+${index}`"
      :date="date"
      :index="index"
      @click="updateCurrentDate"
    ></kalendar-day>
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  name: 'kalendar-monthly-body',
  props: {
    currentDate: {
      type: Date,
      required: true,
    },
    loadEventsPromise: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      calendar: null,
    };
  },
  watch: {
    currentDate(newDate, oldDate) {
      if (oldDate.getMonth() !== newDate.getMonth()) {
        this.updateCalendar(newDate);
      }
    },
  },
  methods: {
    updateCurrentDate(date) {
      this.$emit('update:currentDate', date);
    },
    updateCalendar(date) {
      const calendar = new Calendar(date, {
        type: 'monthly',
      });
      this.loadEventsPromise(calendar.startDate, calendar.endDate).then((events) => {
        calendar.events = events;
        events.forEach((event) => {
          calendar.setEvent(event);
        });
        console.log(calendar);
        this.calendar = calendar;
      });
    },
  },
  mounted() {
    this.updateCalendar(this.currentDate);
  },
};
</script>

<style scoped>
.kalendar-monthly-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
</style>
