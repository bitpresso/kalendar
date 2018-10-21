<template>
  <div class="kalendar-day" :style="style" @click="click">
    {{date.getMonth() + 1}}/{{date.getDate()}}
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
  data() {
    return {
      row: Math.floor(this.index / 7) + 1,
      column: (this.index % 7) + 1,
    };
  },
  computed: {
    style() {
      return {
        'grid-column': this.column,
        'grid-row': this.row,
      };
    },
  },
  methods: {
    click() {
      this.$emit('click', this.date);
    },
  },
};
</script>
