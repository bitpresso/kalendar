<template>
  <div class="kalendar-weekly">
    <div class="kalendar-weekly-header-group" style="position: fixed; height: 1px;">
      <div class="kalendar-weekly-timeline"></div>
      <div class="kalendar-weekly-header">
        <div v-for="(name, index) in dayHeader" :key="name"
          :class="`day${index}`"
        >
          <div>{{name}}</div>
          <div>{{dates[index].day}}</div>
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
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${dates[0].day}:${index}`"
          :date="dates[0]" :time="{ hour: index }" @click="handleClick"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${dates[1].day}:${index}`"
          :date="dates[1]" :time="{ hour: index }" @click="handleClick"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${dates[2].day}:${index}`"
          :date="dates[2]" :time="{ hour: index }" @click="handleClick"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${dates[3].day}:${index}`"
          :date="dates[3]" :time="{ hour: index }" @click="handleClick"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${dates[4].day}:${index}`"
          :date="dates[4]" :time="{ hour: index }" @click="handleClick"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${dates[5].day}:${index}`"
          :date="dates[5]" :time="{ hour: index }" @click="handleClick"
        ></kalendar-hour>
        <kalendar-hour v-for="(hour, index) in hours" :key="`H:${dates[6].day}:${index}`"
          :date="dates[6]" :time="{ hour: index }" @click="handleClick"
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
    dates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dayHeader: i18n[navigator.language],
      hours: new Array(24),
    };
  },
  methods: {
    handleClick(date) {
      this.$emit('update:current', date);
    },
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
