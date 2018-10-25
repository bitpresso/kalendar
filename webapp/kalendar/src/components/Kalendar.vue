<template>
  <div class="kalendar">
    <div class="kalendar-toolbar" style="position: fixed;">
      K:alendar
    </div>
    <div class="kalendar-toolbar"></div>
    <div class="kalendar-content">
      <div v-if="monthlyView">
        <kalendar-monthly :calendar="calendar"></kalendar-monthly>
      </div>
      <div v-else>
        <kalendar-weekly :calendar="calendar"></kalendar-weekly>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '../Calendar';
import KalendarMonthly from './KalendarMonthly.vue';
import KalendarWeekly from './KalendarWeekly.vue';

export default {
  components: {
    KalendarMonthly,
    KalendarWeekly,
  },
  data() {
    return {
      monthlyView: true,
      calendar: new Calendar(),
    };
  },
};
</script>

<style scoped>
.kalendar-toolbar {
  width: 100%;
}
</style>
