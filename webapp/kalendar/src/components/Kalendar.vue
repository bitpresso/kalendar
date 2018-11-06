<template>
  <div class="kalendar" v-if="!!calendar">
    <kalendar-toolbar v-if="options.toolbar"
      v-model="currentView"
      :current-date="currentDate"
      @click:date="handleClickDate"
      @click:prev="handleClickPrev"
      @click:next="handleClickNext"
    ></kalendar-toolbar>
    <kalendar-header
      :current-view="currentView"
      :current-date="currentDate"
      :calendar="calendar"
    >
      <template slot="header" slot-scope="props">
        <slot name="header"
          :current-view="props.currentView"
          :day="props.day"
          :date="props.date"
        ></slot>
      </template>
    </kalendar-header>
    <kalendar-content
      :options="options"
      :current-view="currentView"
      :current-date="currentDate"
      :calendar="calendar"
      :events="events"
      @click:datetime="handleClickDatetime"
      @click:event="handleClickEvent"
      @update:event="updateEvent"
    >
      <template slot="timeline" slot-scope="props">
        <slot name="timeline"
          :hour="props.hour"
        ></slot>
      </template>
      <template slot="datetime" slot-scope="props">
        <slot name="datetime"
          :current-view="props.currentView"
          :datetime="props.datetime"
        ></slot>
      </template>
    </kalendar-content>
  </div>
</template>

<script>
import Calendar from '../Calendar';
import KalendarToolbar from './KalendarToolbar.vue';
import KalendarHeader from './KalendarHeader.vue';
import KalendarContent from './KalendarContent.vue';

export default {
  name: 'kalendar',
  components: {
    KalendarToolbar,
    KalendarHeader,
    KalendarContent,
  },
  model: {
    prop: 'current-date',
    event: 'update:current-date',
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        toolbar: false,
        event: {
          label: {
            id: 'href',
            title: 'title',
            from: 'from',
            to: 'to',
          },
        },
      }),
    },
    view: {
      type: String, // ['monthly' | 'weekly']
      default: () => 'monthly',
    },
    currentDate: {
      type: Date,
      required: true,
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      calendar: null,
      currentView: 'monthly', // ['monthly' | 'weekly']
    };
  },
  methods: {
    handleClickDate() {
      this.$emit('click:toolbar-date');
    },
    handleClickPrev() {
      this.$emit('click:toolbar-prev');
      if (this.options.toolbar) {
        if (this.currentView === 'weekly') {
          this.updateCurrentDate(Calendar.moveToPrevWeek(this.currentDate));
        } else {
          this.updateCurrentDate(Calendar.moveToPrevMonth(this.currentDate));
        }
      }
    },
    handleClickNext() {
      this.$emit('click:toolbar-next');
      if (this.options.toolbar) {
        if (this.currentView === 'weekly') {
          this.updateCurrentDate(Calendar.moveToNextWeek(this.currentDate));
        } else {
          this.updateCurrentDate(Calendar.moveToNextMonth(this.currentDate));
        }
      }
    },
    handleClickDatetime(datetime) {
      this.$emit('click:datetime', datetime, this.currentView);
    },
    handleClickEvent(event) {
      this.$emit('click:event', event);
    },
    updateCurrentDate(date) {
      this.$emit('update:current-date', date);
    },
    updateEvent(event) {
      this.$emit('update:event', event);
    },
    updateRange() {
      const dates = this.calendar[this.currentView];
      const from = dates[0];
      const to = Calendar.getOffsetDate(dates[dates.length - 1], { day: 1 });
      this.$emit('update:range', from, to);
    },
  },
  watch: {
    calendar() {
      this.updateRange();
    },
    currentDate(newCurrentDate) {
      this.calendar.update(newCurrentDate);
      this.updateRange();
    },
    currentView() {
      this.updateRange();
      this.$emit('update:view', this.view);
    },
  },
  mounted() {
    this.calendar = new Calendar(this.currentDate);
  },
};
</script>
