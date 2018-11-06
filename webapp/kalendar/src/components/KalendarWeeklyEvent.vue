<template>
  <div class="kalendar-weekly-event"
    :style="{ 'grid-area': `${row} / ${column} / ${span} / auto` }"
    @click="handleClickEvent"
  >
    {{event[options.title]}}
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    column() {
      return this.event[options.from].getDay() + 1;
    },
    row() {
      return this.event[options.from].getHours();
    },
    span() {
      const duration = Math.floor((this.event[options.to] - this.event[options.from]) / 3600000);
      if (duration > 1) {
        return `span ${duration}`;
      }
      return 'auto';
    },
  },
  methods: {
    handleClickEvent() {
      this.$emit('click:event', this.event);
    },
  },
};
</script>
