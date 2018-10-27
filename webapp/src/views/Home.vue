<template>
  <div>
    <kalendar
      :current-date="selectedDate"
      @click:date-picker-button="openDatePicker"
      @click:date="createEvent"
    ></kalendar>
    <v-dialog v-model="datePickerDialog" width="290px">
      <v-date-picker color="brown" show-current scrollable
        :value="selectedDateString"
        @input="closeDatePicker"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      selectedDate: new Date(),
      datePickerDialog: false,
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
    createEvent(date) {
      this.selectedDate = date;
      console.log('TODO: create event:', date);
    },
  },
};
</script>
