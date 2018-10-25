<template>
  <div class="kalendar-day">
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
};
</script>

<style scoped>
.kalendar-day {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1.8em;
}
</style>
