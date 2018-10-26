<template>
  <div class="kalendar-hour" @click="handleClick">
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
      return `${this.date.getMonth() + 1}/${this.date.getDate()} ${this.date.getHours()}:00`;
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
.kalendar-hour {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1.8em;
}
</style>
