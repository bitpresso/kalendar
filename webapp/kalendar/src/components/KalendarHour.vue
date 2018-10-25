<template>
  <div class="kalendar-hour">
    {{date.month}}/{{date.day}}
    {{time.hour}}:00
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      required: true,
    },
    time: {
      type: Object,
      required: true,
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
