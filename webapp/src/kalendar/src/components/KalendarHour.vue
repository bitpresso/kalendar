<template>
  <div class="kalendar-hour" @click="click">
    <kalendar-event v-for="event in date.events"
      :key="`E#${event.start}+${event.end}`"
      :event="event"
    ></kalendar-event>
  </div>
</template>

<script>
export default {
  name: 'kalendar-hour',
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
  //     row: (this.index % 24) + 1,
  //     column: Math.floor(this.index / 24) + 1,
  //   };
  // },
  // computed: {
  //   style() {
  //     return {
  //       'grid-column': this.column,
  //       'grid-row': this.row,
  //     };
  //   },
  // },
  methods: {
    click() {
      this.$emit('click', this.date);
    },
  },
};
</script>

<style scoped>
.kalendar-hour {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1.8em;
}
</style>
