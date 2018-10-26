<template>
  <div class="kalendar-day" @click="handleClickDate">
    {{label}}
  </div>
</template>

<script>
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
      this.$emit('click:date', this.date);
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
