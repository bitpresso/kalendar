<template>
  <div class="kalendar-monthly-body">
    <kalendar-day v-for="(date, index) in calendar.days"
      :key="`D${date.toJSON()}`"
      :date="date"
      :index="index"
    ></kalendar-day>
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  name: 'kalendar-monthly-body',
  props: {
    value: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      calendar: new Calendar(new Date()),
    };
  },
  watch: {
    value(newValue) {
      if (!this.calendar.includes(newValue)) {
        this.calendar = new Calendar(newValue);
      }
    },
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
