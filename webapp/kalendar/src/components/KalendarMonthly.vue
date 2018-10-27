<template>
  <div class="kalendar-monthly">
    <div class="kalendar-monthly-header" style="position: fixed;">
      <div class="kalendar-monthly-header-day"
        v-for="(name, index) in header" :key="name"
        :class="[
          `day${index}`,
          { selected: currentDate.getDay() === index },
        ]"
      >
        {{name}}
      </div>
    </div>
    <div class="kalendar-monthly-header"></div>
    <div class="kalendar-monthly-content">
      <kalendar-day v-for="(date, index) in dates" :key="`D:${index}`"
        :class="[
          `day${index % 7}`,
          { selected: isCurrentDate(date) },
        ]"
        :date="date"
        @click:date="handleClickDate"
      ></kalendar-day>
    </div>
  </div>
</template>

<script>
import KalendarDay from './KalendarDay.vue';
import header from '../day-header.json';

export default {
  components: {
    KalendarDay,
  },
  props: {
    currentDate: {
      type: Date,
    },
    dates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      header: header[navigator.language],
    };
  },
  methods: {
    isCurrentDate(date) {
      return this.currentDate.getMonth() === date.getMonth()
        && this.currentDate.getDate() === date.getDate();
    },
    handleClickDate(date) {
      this.$emit('click:date', date);
    },
  },
};
</script>

<style scoped>
.kalendar-monthly {
  display: grid;
}

.kalendar-monthly-header {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.kalendar-monthly-content {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
</style>
