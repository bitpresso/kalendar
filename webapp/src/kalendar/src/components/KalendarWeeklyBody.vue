<template>
  <div class="kalendar-weekly-body" v-if="calendar">
    <kalendar-hour v-for="(date, index) in calendar.dates"
      :key="`H#${date.toJSON()}+${index}`"
      :date="date"
      :index="index"
      @click="updateCurrentDate"
    ></kalendar-hour>
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  name: 'kalendar-weekly-body',
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
    currentDate(newDate) {
      if (!this.calendar || !this.calendar.includes(newDate)) {
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
        type: 'weekly',
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
.kalendar-weekly-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, minmax(50px, auto));
  grid-auto-flow: column;
}
</style>
