<template>
  <div class="kalendar-weekly-body">
    <kalendar-hour v-for="(date, index) in calendar.hours"
      :key="`H+${date.toJSON()}+${index}`"
      :date="date"
      :index="index"
      @click="selectHour"
    ></kalendar-hour>
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  name: 'kalendar-weekly-body',
  props: {
    selectedDate: {
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
    selectedDate(newValue) {
      if (!this.calendar.includes(newValue)) {
        this.calendar = Calendar.weekly(newValue);
      }
    },
  },
  methods: {
    selectHour(date) {
      this.$emit('update:selectedDate', date);
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
