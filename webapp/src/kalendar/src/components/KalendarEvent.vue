<template>
  <div class="kalendar-event">
    <span class="kalendar-event-date">{{timeString}}</span>&nbsp;
    <span class="kalendar-event-title">{{event.title}}</span>
  </div>
</template>

<script>
export default {
  name: 'kalendar-event',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      timeString: null,
    };
  },
  watch: {
    startDate(newDate) {
      this.timeString = `${newDate.getHours()}:00`;
    },
  },
  mounted() {
    this.startDate = new Date(this.event.start);
    this.endDate = new Date(this.event.end);
  },
};
</script>

<style scoped>
.kalendar-event {
  margin: 2px 0;
}
</style>
