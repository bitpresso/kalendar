<template>
  <div>
    <div :class="[ 'kalendar-header', currentView ]" style="position: fixed;">
      <div class="header-timeline kalendar-timeline" v-if="currentView !== 'monthly'">
        <div class="header-timeline-area"></div>
      </div>
      <div :class="[ 'header-datetime', 'kalendar-datetime', currentView ]">
        <div class="header-datetime-area"
          v-for="(day, index) in header" :key="day"
          :class="getDatetimeClass(index)"
        >
          <slot name="header"
            :current-view="currentView"
            :day="day"
            :date="calendar.weekly[index]"
          ></slot>
        </div>
      </div>
    </div>
    <div :class="[ 'kalendar-header', currentView ]"></div>
  </div>
</template>

<script>
import header from '../day-header.json';

export default {
  props: {
    currentView: {
      type: String,
      required: true,
    },
    currentDate: {
      type: Date,
      required: true,
    },
    calendar: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      header: header[navigator.language.split('-')[0]],
    };
  },
  methods: {
    getDatetimeClass(index) {
      return [
        this.currentView,
        `day${index}`,
        { selected: index === this.currentDate.getDay() },
      ];
    },
  },
};
</script>

<style scoped>
.kalendar-header {
  display: grid;
  width: 100%;
}
.kalendar-header.monthly {
  grid-template-columns: auto;
}
.kalendar-header.weekly {
  grid-template-columns: minmax(0, max-content) auto;
}

.kalendar-header .header-datetime {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
