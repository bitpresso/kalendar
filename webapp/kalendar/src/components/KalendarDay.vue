<template>
  <div class="kalendar-day" @click="handleClickDate">
    {{label}}
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    label() {
      return `${this.date.getMonth() + 1}/${this.date.getDate()}`;
    },
  },
  methods: {
    handleClickDate() {
      const now = new Date();
      const date = Calendar.getOffsetDate(this.date, { hour: now.getHours() });
      this.$emit('click:date', date);
    },
  },
};
</script>

<style scoped>
.kalendar-day {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1.8em;
}
</style>
