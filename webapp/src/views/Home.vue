<template>
  <div>
    <kalendar v-model="selectedDate" :openDatePicker="openDatePicker"></kalendar>
    <v-dialog v-model="datePickerDialog" width="290px">
      <v-date-picker v-model="pickedDateString"
        color="brown" show-current scrollable
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
      pickedDateString: null,
    };
  },
  watch: {
    selectedDate(newSelectedDate) {
      console.log('selectedDate:', newSelectedDate.toLocaleDateString());
      this.closeDatePicker();
    },
    pickedDateString(newPickedDateString) {
      this.selectedDate = new Date(newPickedDateString);
    },
  },
  methods: {
    openDatePicker() {
      this.datePickerDialog = true;
    },
    closeDatePicker() {
      this.datePickerDialog = false;
    },
  },
};
</script>
