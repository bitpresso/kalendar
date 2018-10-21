<template>
  <div class="kalendar-weekly-body">
    <kalendar-hour v-for="(date, index) in calendar.hours"
      :key="`H${date.toJSON()}`"
      :date="date"
      :index="index"
    ></kalendar-hour>
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  name: 'kalendar-weekly-body',
  props: {
    value: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      calendar: Calendar.weekly(new Date()),
    };
  },
  watch: {
    value(newValue) {
      if (!this.calendar.includes(newValue)) {
        this.calendar = Calendar.weekly(newValue);
      }
    },
  },
};
</script>

<style scoped>
.kalendar-weekly-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, 40px);
  grid-auto-flow: column;
}
</style>
