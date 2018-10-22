<template>
  <div class="kalendar-day" :class="dayOfWeek" @click="click">
    <div class="kalendar-day-label">
      <span v-if="!thisMonth">{{date.getMonth() + 1}}/</span>
      {{date.getDate()}}
    </div>
    <kalendar-event v-for="event in date.events"
      :key="`E#${event.start}+${event.end}`"
      :event="event"
    ></kalendar-event>
  </div>
</template>

<script>
export default {
  name: 'kalendar-day',
  props: {
    date: {
      type: Date,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  // data() {
  //   return {
  //     row: Math.floor(this.index / 7) + 1,
  //     column: (this.index % 7) + 1,
  //   };
  // },
  computed: {
    dayOfWeek() {
      return `day${this.date.getDay()}`;
    },
    // style() {
    //   return {
    //     'grid-column': this.column,
    //     'grid-row': this.row,
    //   };
    // },
  },
  methods: {
    thisMonth() {
      return this.date.getMonth() === this.$store.state.currentDate.getMonth();
    },
    click() {
      this.$emit('click', this.date);
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
