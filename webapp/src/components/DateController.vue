<template>
  <div>
    <v-btn small flat fab @click="prev">
      <v-icon>keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn dark color="brown" @click="openPicker">
      <v-icon left>event</v-icon>
      {{selectedDateString}}
    </v-btn>
    <v-btn small flat fab @click="next">
      <v-icon>keyboard_arrow_right</v-icon>
    </v-btn>
    <v-dialog v-model="monthPicker" width="290px">
      <v-date-picker color="brown" show-current scrollable type="month"
        :value="selectedDateString" @input="date => pickedDateString = date"
      ></v-date-picker>
    </v-dialog>
    <v-dialog v-model="datePicker" width="290px">
      <v-date-picker color="brown" show-current scrollable
        :value="selectedDateString" @input="date => pickedDateString = date"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import { CHANGE_SELECTED_DATE } from '@/store';

export default {
  name: 'date-controller',
  data() {
    return {
      monthPicker: false,
      datePicker: false,
      pickedDateString: null,
    };
  },
  computed: {
    monthly() {
      return this.$store.state.viewId === '#monthly';
    },
    selectedDateString() {
      const { selectedDate } = this.$store.state;
      const dateString = selectedDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).split('/');
      return (this.monthly)
        ? `${dateString[2]}-${dateString[1]}`
        : `${dateString[2]}-${dateString[1]}-${dateString[0]}`;
    },
  },
  methods: {
    prev() {
      const { selectedDate } = this.$store.state;
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const day = selectedDate.getDate();
      if (this.monthly) {
        const lastDateOfPrevMonth = new Date(year, month, 0);
        const lastDayOfPrevMonth = lastDateOfPrevMonth.getDate();
        this.$store.commit({
          type: CHANGE_SELECTED_DATE,
          year,
          month,
          day: (lastDayOfPrevMonth < day) ? lastDayOfPrevMonth : day,
        });
      } else {
        this.$store.commit({
          type: CHANGE_SELECTED_DATE,
          year,
          month: month + 1,
          day: day - 7,
        });
      }
    },
    next() {
      const { selectedDate } = this.$store.state;
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const day = selectedDate.getDate();
      if (this.monthly) {
        const lastDateOfPrevMonth = new Date(year, month + 2, 0);
        const lastDayOfPrevMonth = lastDateOfPrevMonth.getDate();
        this.$store.commit({
          type: CHANGE_SELECTED_DATE,
          year,
          month: month + 2,
          day: (lastDayOfPrevMonth < day) ? lastDayOfPrevMonth : day,
        });
      } else {
        this.$store.commit({
          type: CHANGE_SELECTED_DATE,
          year,
          month: month + 1,
          day: day + 7,
        });
      }
    },
    openPicker() {
      if (this.monthly) {
        this.monthPicker = true;
      } else {
        this.datePicker = true;
      }
    },
    closePicker() {
      if (this.monthly) {
        this.monthPicker = false;
      } else {
        this.datePicker = false;
      }
    },
  },
  watch: {
    pickedDateString(newValue) {
      const dateString = newValue.split('-');
      this.$store.commit({
        type: CHANGE_SELECTED_DATE,
        year: dateString[0],
        month: dateString[1],
        day: dateString[2],
      });
      this.closePicker();
    },
  },
};
</script>
