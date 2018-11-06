<template>
  <div class="kalendar" v-if="!!calendar">
    <kalendar-toolbar v-if="toolbar"
      v-model="currentView"
      :current-date="calendar.current.date"
      @click:date="handleClickDate"
      @click:prev="handleClickPrev"
      @click:next="handleClickNext"
    ></kalendar-toolbar>
    <kalendar-header
      :current-view="currentView"
      :current-date="calendar.current.date"
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
      :current-view="currentView"
      :current-date="calendar.current.date"
      :calendar="calendar"
      @click:datetime="handleClickDatetime"
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
  props: {
    toolbar: {
      type: Boolean,
      default: () => false,
    },
    view: {
      type: String, // ['monthly' | 'weekly']
      default: () => 'monthly',
    },
    currentDate: {
      type: Date,
      required: true,
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
      if (this.toolbar) {
        if (this.currentView === 'weekly') {
          this.calendar.moveToPrevWeek();
        } else {
          this.calendar.moveToPrevMonth();
        }
      }
    },
    handleClickNext() {
      this.$emit('click:toolbar-next');
      if (this.toolbar) {
        if (this.currentView === 'weekly') {
          this.calendar.moveToNextWeek();
        } else {
          this.calendar.moveToNextMonth();
        }
      }
    },
    handleClickDatetime(datetime) {
      this.$emit('click:datetime', datetime);
    },
    notifyUpdate() {
      const dates = this.calendar[this.currentView];
      const from = dates[0];
      const to = dates[dates.length - 1];
      this.$emit('update', {
        from,
        to: new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1),
      });
    },
  },
  watch: {
    calendar() {
      console.log('watch:calendar');
      this.notifyUpdate();
    },
    currentDate(newCurrentDate) {
      console.log('watch:currentDate');
      this.calendar.update(newCurrentDate);
      this.notifyUpdate();
    },
    view() {
      console.log('watch:view');
      this.notifyUpdate();
      this.$emit('update:view', this.view);
    },
  },
  mounted() {
    this.calendar = new Calendar(this.currentDate);
  },
};
</script>
