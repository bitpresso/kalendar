<template>
  <v-content>
    <kalendar
      toolbar
      :current-date="selectedDate"
      @click:toolbar-date="openDatePicker"
      @click:datetime="changeSelectedDate"
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
          <button @click="openEventDialogToPostEvent(props.datetime)">
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
    <event-dialog v-if="selectedEvent" v-model="eventDialog.show"
      :mode="eventDialog.mode"
      :event="selectedEvent"
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
    };
  },
  computed: {
    selectedDateString() {
      const dateString = this.selectedDate.toLocaleDateString('en-GB');
      const token = dateString.split('/');
      return `${token[2]}-${token[1]}-${token[0]}`;
    },
  },
  watch: {
    selectedDate(newSelectedDate) {
      console.log('selectedDate:', newSelectedDate.toLocaleDateString());
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
    openEventDialog(mode, event) {
      this.selectedEvent = event;
      this.eventDialog = {
        show: true,
        mode,
      };
    },
    closeEventDialog() {
      this.eventDialog = {
        show: false,
      };
      this.selectedEvent = null;
    },
    openEventDialogToPostEvent(datetime) {
      this.openEventDialog('post', {
        start: datetime,
        end: Calendar.getOffsetDate(datetime, { hour: 1 }),
      });
    },
    postEvent(event) {
      console.log('post:', event);
    },
    patchEvent(event) {
      console.log('patch:', event);
    },
    deleteEvent(event) {
      console.log('delete:', event);
    },
  },
};
</script>
