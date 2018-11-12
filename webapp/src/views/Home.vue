<template>
  <v-content>
    <kalendar
      v-model="selectedDate"
      :options="options"
      :events="events"
      @click:toolbar-date="openDatePicker"
      @click:datetime="openEventDialogToPostEvent"
      @click:event="openEventDialogToPatchEvent"
      @update:event="patchEvent"
      @update:range="updateRange"
    >
      <template slot="header" slot-scope="props">
        <span>{{props.day}}</span>
        <span v-if="props.currentView !== 'monthly'"
          style="font-size: 1.4em;"
        >
          {{props.date.getDate()}}
        </span>
      </template>
      <template slot="timeline" slot-scope="props">
        {{props.hour}}:00
      </template>
      <template slot="datetime" slot-scope="props">
        <div v-if="props.currentView === 'monthly'">
          <button @click.stop="changeSelectedDate(props.datetime)">
            {{props.datetime.getDate()}}
          </button>
        </div>
      </template>
    </kalendar>
    <v-dialog v-model="datePickerDialog.show" width="290px">
      <v-date-picker color="brown" show-current scrollable
        :value="selectedDateString"
        @input="closeDatePicker"
      ></v-date-picker>
    </v-dialog>
    <event-dialog v-model="eventDialog.show"
      :mode="eventDialog.mode"
      :event="eventDialog.event"
      @post:event="postEvent"
      @patch:event="patchEvent"
      @delete:event="deleteEvent"
    ></event-dialog>
  </v-content>
</template>

<script>
import EventDialog from '@/components/EventDialog.vue';
import Calendar from '../../kalendar/src/Calendar';

export default {
  name: 'home',
  components: {
    EventDialog,
  },
  data() {
    return {
      selectedDate: new Date(),
      datePickerDialog: {
        show: false,
      },
      eventDialog: {
        show: false,
      },
      selectedEvent: null,
      events: [],
      options: {
        toolbar: true,
        event: {
          label: {
            id: 'href',
            title: 'title',
            from: 'start',
            to: 'end',
          },
        },
      },
    };
  },
  computed: {
    selectedDateString() {
      const dateString = this.selectedDate.toLocaleDateString('en-GB');
      const token = dateString.split('/');
      return `${token[2]}-${token[1]}-${token[0]}`;
    },
  },
  methods: {
    changeSelectedDate(datetime) {
      this.selectedDate = datetime;
    },
    openDatePicker() {
      this.datePickerDialog.show = true;
    },
    closeDatePicker(pickedDateString) {
      this.selectedDate = new Date(pickedDateString);
      this.datePickerDialog.show = false;
    },
    updateRange(start, end) {
      this.range = {
        start,
        end,
      };
      this.loadEvents();
    },
    openEventDialog(mode, event) {
      this.eventDialog = {
        show: true,
        mode,
        event,
      };
    },
    openEventDialogToPostEvent(datetime, view) {
      const start = (view !== 'monthly')
        ? datetime
        : Calendar.getCorrectedDate(datetime, { hour: new Date().getHours() });
      this.openEventDialog('post', {
        start,
        end: Calendar.getOffsetDate(start, { hour: 1 }),
      });
    },
    openEventDialogToPatchEvent(event) {
      this.openEventDialog('patch', event);
    },
    loadEvents() {
      this.$service.event.getEventsByRange(this.range.start, this.range.end).then((results) => {
        this.events = results;
      }).catch((error) => {
        console.error(error);
      });
    },
    postEvent(event) {
      this.$service.event.postEvent(event).then(() => {
        this.loadEvents();
      }).catch((error) => {
        console.error(error);
      });
    },
    patchEvent(event) {
      this.$service.event.patchEvent(event).then(() => {
        this.loadEvents();
      }).catch((error) => {
        console.error(error);
      });
    },
    deleteEvent(event) {
      this.$service.event.deleteEvent(event).then(() => {
        this.loadEvents();
      }).catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>
