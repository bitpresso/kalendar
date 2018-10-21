<template>
  <div class="kalendar-hour" :style="style">
    [{{column}}/{{row}}]
    {{date.getHours()}}
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
  data() {
    return {
      row: (this.index % 24) + 1,
      column: Math.floor(this.index / 24) + 1,
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
};
</script>
