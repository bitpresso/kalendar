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
        :style="getDatetimeStyle(index)"
        @click.stop="handleClickDatetime(datetime)"
        @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop($event, datetime)"
      >
        <slot name="datetime"
          :current-view="currentView"
          :datetime="datetime"
        ></slot>
        <div v-if="currentView === 'monthly'"
          v-for="event in monthlyEvents[index]" :key="getMonthlyEventKey(event, index)"
          :class="[ 'kalendar-event', currentView ]"
          @click.stop="handleClickEvent(event)"
          draggable="true"
          @dragstart="handleDragStart($event, event)"
        >
          <div class="kalendar-event-time">{{event[options.event.label.from].getHours()}}:00</div>
          <div class="kalendar-event-title">{{event[options.event.label.title]}}</div>
        </div>
      </div>
      <div v-if="currentView !== 'monthly'"
        v-for="event in events" :key="getEventKey(event)"
        :class="[ 'kalendar-event', currentView ]"
        :style="getEventStyle(event)"
        @click.stop="handleClickEvent(event)"
        draggable="true"
        @dragstart="handleDragStart($event, event)"
      >
        {{event[options.event.label.title]}}
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '../Calendar';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
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
    events: {
      type: Array,
      default: () => [],
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
    monthlyEvents() {
      const events = [];
      this.events.forEach((event) => {
        const key = event[this.options.event.label.from].toDateString();
        const index = this.calendar.indexes[key];
        if (events[index] === undefined) {
          events[index] = [event];
        } else {
          events[index].push(event);
        }
      });
      return events;
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
    getDatetimeStyle(index) {
      const row = (this.currentView === 'monthly')
        ? Math.floor(index / 7) + 1 : (index % 24) + 1;
      const col = (this.currentView === 'monthly')
        ? (index % 7) + 1 : Math.floor(index / 24) + 1;
      return [
        { 'grid-row': row },
        { 'grid-column': col },
      ];
    },
    getMonthlyEventKey(event, index) {
      return `${this.getEventKey(event)}:${index}`;
    },
    getEventKey(event) {
      return `E:${event[this.options.event.label.id]}`;
    },
    getEventStyle(event) {
      const { label } = this.options.event;
      const from = event[label.from];
      const to = event[label.to];

      const col = (this.currentView === 'weekly') ? from.getDay() + 1 : 1;
      const row = from.getHours() + 1;
      const span = (to - from) / 3600000;
      return [
        { 'grid-area': `${row} / ${col} / span ${span} / auto` },
      ];
    },
    handleClickDatetime(datetime) {
      this.$emit('click:datetime', datetime);
    },
    handleClickEvent(event) {
      this.$emit('click:event', event);
    },
    handleDragStart($event, event) {
      $event.dataTransfer.setData('kalendar/event', JSON.stringify(event));
    },
    handleDragOver($event) {
      $event.dataTransfer.dropEffect = 'move'; // eslint-disable-line
    },
    handleDrop($event, datetime) {
      const dataString = $event.dataTransfer.getData('kalendar/event');
      const event = JSON.parse(dataString);

      const { from, to } = this.options.event.label;
      event[from] = new Date(event[from]);
      event[to] = new Date(event[to]);
      const hours = (event[to] - event[from]) / 3600000;

      event[from].setMonth(datetime.getMonth());
      event[from].setDate(datetime.getDate());
      if (this.currentView !== 'monthly') {
        event[from].setHours(datetime.getHours());
      }
      event[to] = Calendar.getOffsetDate(event[from], { hour: hours });
      this.$emit('update:event', event);
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
  grid-auto-rows: auto;
}
.content-datetime.weekly {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, auto);
  grid-auto-flow: column;
}

.kalendar-event.monthly {
  display: grid;
  grid-template-columns: minmax(0, max-content) auto;
  grid-auto-flow: column;
  align-items: center;
}
</style>
