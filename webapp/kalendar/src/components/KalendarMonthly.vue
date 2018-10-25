<template>
  <div class="kalendar-monthly">
    <div class="kalendar-monthly-header" style="position: fixed;">
      <div v-for="(name, index) in dayHeader" :key="name" :class="`day${index}`">
        {{name}}
      </div>
    </div>
    <div class="kalendar-monthly-header"></div>
    <div class="kalendar-monthly-content">
      <kalendar-day v-for="(date, index) in monthly" :key="`D:${index}`"
        :date="date"
      ></kalendar-day>
    </div>
  </div>
</template>

<script>
import KalendarDay from './KalendarDay.vue';
import i18n from '../i18n.json';

export default {
  components: {
    KalendarDay,
  },
  props: {
    calendar: {
      type: Object,
      required: true,
    },
  },
  computed: {
    monthly() {
      return this.calendar.monthly;
    },
  },
  data() {
    return {
      dayHeader: i18n[navigator.language],
    };
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
