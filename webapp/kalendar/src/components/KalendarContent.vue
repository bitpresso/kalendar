<template>
  <div :class="[ 'kalendar-content', currentView ]">
    <div class="content-timeline kalendar-timeline" v-if="currentView !== 'monthly'">
      <div class="content-timeline-area"
        v-for="(time, index) in times" :key="`T:${index}`"
      >
        <slot name="timeline"
          :hour="index"
        ></slot>
      </div>
    </div>
    <div :class="[ 'content-datetime', 'kalendar-datetime', currentView ]">
      <div class="content-datetime-area"
        v-for="(datetime, index) in datetimes" :key="`D:${index}`"
        :class="getDatetimeClass(datetime)"
        @click="handleClickDatetime(datetime)"
      >
        <slot name="datetime"
          :current-view="currentView"
          :datetime="datetime"
        ></slot>
      </div>
    </div>
  </div>
</template>

<script>
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
      times: new Array(24),
    };
  },
  computed: {
    datetimes() {
      if (this.currentView === 'monthly') {
        return this.calendar.monthly;
      }
      const datetimes = [];
      this.calendar[this.currentView].forEach((date, day) => {
        for (let hour = 0; hour < 24; hour += 1) {
          const index = (day * 24) + hour;
          datetimes[index] = new Date(date.getTime());
          datetimes[index].setHours(hour);
        }
      });
      return datetimes;
    },
  },
  methods: {
    deviated(datetime) {
      return datetime.getMonth() !== this.currentDate.getMonth();
    },
    selected(datetime) {
      return datetime.getDate() === this.currentDate.getDate()
        && datetime.getMonth() === this.currentDate.getMonth()
        && datetime.getFullYear() === this.currentDate.getFullYear();
    },
    getDatetimeClass(datetime) {
      return [
        this.currentView,
        this.deviated(datetime) ? 'deviated' : `day${datetime.getDay()}`,
        { selected: this.selected(datetime) },
      ];
    },
    handleClickDatetime(datetime) {
      this.$emit('click:datetime', datetime);
    },
  },
};
</script>

<style scoped>
.kalendar-content {
  display: grid;
  width: 100%;
}
.kalendar-content.monthly {
  grid-template-columns: auto;
}
.kalendar-content.weekly {
  grid-template-columns: minmax(0, max-content) auto;
}

.content-timeline {
  display: grid;
}

.content-datetime.monthly {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* grid-auto-rows: minmax(120px, auto); */
  grid-auto-rows: auto;
}
.content-datetime.weekly {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* grid-template-rows: repeat(24, minmax(50px, auto)); */
  grid-template-rows: repeat(24, auto);
  grid-auto-flow: column;
}
</style>
