<template>
  <div class="kalendar-monthly-body">
    <kalendar-day v-for="(date, index) in calendar.days"
      :key="`D+${date.toJSON()}+${index}`"
      :date="date"
      :index="index"
      @click="selectDay"
    ></kalendar-day>
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  name: 'kalendar-monthly-body',
  props: {
    selectedDate: {
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
    selectedDate(newDate, oldDate) {
      if (oldDate.getMonth() !== newDate.getMonth()) {
        this.calendar = new Calendar(newDate);
      }
    },
  },
  methods: {
    selectDay(date) {
      this.$emit('update:selectedDate', date);
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
