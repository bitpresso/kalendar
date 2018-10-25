<template>
  <div class="kalendar-day" @click="handleClick">
    {{date.month}}/{{date.day}}
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
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
