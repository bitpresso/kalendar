<template>
  <div class="kalendar-weekly">
    <div class="kalendar-weekly-header-group" style="position: fixed;">
      <div class="kalendar-weekly-timeline"></div>
      <div class="kalendar-weekly-header">
        <div v-for="(name, index) in dayHeader" :key="name"
          :class="`day${index}`"
        >
          {{calendar.weekly[index].day}}
          {{name}}
        </div>
      </div>
    </div>
    <div class="kalendar-weekly-header"></div>
    <div class="kalendar-weekly-content-group">
      <div class="kalendar-weekly-timeline">
        <div v-for="(hour, index) in hours" :key="`T:${index}`"
          class="kalendar-weekly-timeline-item"
        >
          {{index}}:00
        </div>
      </div>
      <div class="kalendar-weekly-content">
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${weekly[0].day}${index}`"
          :date="weekly[0]" :time="{ hour: index }"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${weekly[1].day}${index}`"
          :date="weekly[1]" :time="{ hour: index }"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${weekly[2].day}${index}`"
          :date="weekly[2]" :time="{ hour: index }"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${weekly[3].day}${index}`"
          :date="weekly[3]" :time="{ hour: index }"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${weekly[4].day}${index}`"
          :date="weekly[4]" :time="{ hour: index }"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${weekly[5].day}${index}`"
          :date="weekly[5]" :time="{ hour: index }"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${weekly[6].day}${index}`"
          :date="weekly[6]" :time="{ hour: index }"
        ></kalendar-hour>
      </div>
    </div>
  </div>
</template>

<script>
import KalendarHour from './KalendarHour.vue';
import i18n from '../i18n.json';

export default {
  components: {
    KalendarHour,
  },
  props: {
    calendar: {
      type: Object,
      required: true,
    },
  },
  computed: {
    weekly() {
      return this.calendar.weekly;
    },
  },
  data() {
    return {
      dayHeader: i18n[navigator.language],
      hours: new Array(24),
    };
  },
};
</script>

<style scoped>
.kalendar-weekly {
  display: grid;
}

.kalendar-weekly-timeline {
  float: left;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(24, minmax(50px, auto));
  grid-auto-flow: column;
}

.kalendar-weekly-header-group {
  width: 100%;
}
.kalendar-weekly-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-flow: column;
}

.kalendar-weekly-content {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, minmax(50px, auto));
  grid-auto-flow: column;
}
</style>
