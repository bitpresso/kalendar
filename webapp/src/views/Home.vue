<template>
  <div>
    <kalendar
      :current-date="selectedDate"
      @click:date-picker-button="openDatePicker"
      @click:date="openEventDialogToCreateEvent"
    ></kalendar>
    <v-dialog v-model="datePickerDialog" width="290px">
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
  </div>
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
      datePickerDialog: false,
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
    openDatePicker() {
      this.datePickerDialog = true;
    },
    closeDatePicker(pickedDateString) {
      this.selectedDate = new Date(pickedDateString);
      this.datePickerDialog = false;
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
    openEventDialogToCreateEvent(date) {
      this.openEventDialog('post', {
        start: date,
        end: Calendar.getOffsetDate(date, { hour: 1 }),
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
