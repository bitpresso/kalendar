<template>
  <div>
    <v-btn small flat fab @click="prev">
      <v-icon>keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn dark color="brown" @click="openPicker">
      <v-icon left>event</v-icon>
      {{currentDateString}}
    </v-btn>
    <v-btn small flat fab @click="next">
      <v-icon>keyboard_arrow_right</v-icon>
    </v-btn>
    <v-dialog v-model="monthPicker" width="290px">
      <v-date-picker color="brown" show-current scrollable type="month"
        :value="currentDateString" @input="date => pickedDateString = date"
      ></v-date-picker>
    </v-dialog>
    <v-dialog v-model="datePicker" width="290px">
      <v-date-picker color="brown" show-current scrollable
        :value="currentDateString" @input="date => pickedDateString = date"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import { CHANGE_CURRENT_DATE } from '@/store';

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
    currentDateString() {
      const { currentDate } = this.$store.state;
      const dateString = currentDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).split('/');
      return (this.monthly)
        ? `${dateString[2]}-${dateString[1]}-${dateString[0]}`
        : `${dateString[2]}-${dateString[1]}-${dateString[0]}`;
    },
  },
  methods: {
    prev() {
      const { currentDate } = this.$store.state;
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      if (this.monthly) {
        const lastDateOfPrevMonth = new Date(year, month, 0);
        const date = new Date(year, month - 1, (day < lastDateOfPrevMonth.getDate())
          ? day : lastDateOfPrevMonth.getDate());
        this.changeCurrentDate(date);
      } else {
        const date = new Date(year, month, day - 7);
        this.changeCurrentDate(date);
      }
    },
    next() {
      const { currentDate } = this.$store.state;
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      if (this.monthly) {
        const lastDateOfNextMonth = new Date(year, month + 2, 0);
        const date = new Date(year, month + 1, (day < lastDateOfNextMonth.getDate())
          ? day : lastDateOfNextMonth.getDate());
        this.changeCurrentDate(date);
      } else {
        const date = new Date(year, month, day + 7);
        this.changeCurrentDate(date);
      }
    },
    closePicker() {
      if (this.monthly) {
        this.monthPicker = false;
      } else {
        this.datePicker = false;
      }
    },
    openPicker() {
      if (this.monthly) {
        this.monthPicker = true;
      } else {
        this.datePicker = true;
      }
    },
    changeCurrentDate(date) {
      this.$store.commit({
        type: CHANGE_CURRENT_DATE,
        currentDate: date,
      });
    },
  },
  watch: {
    pickedDateString(newPickedDate) {
      const dateString = newPickedDate.split('-');
      const year = Number(dateString[0]);
      const month = Number(dateString[1]);
      const day = (!dateString[2])
        ? this.$store.state.currentDate.getDate() : Number(dateString[2]);
      this.changeCurrentDate(new Date(year, month - 1, day));
      this.closePicker();
    },
  },
  mounted() {
    this.changeCurrentDate(new Date());
  },
};
</script>
