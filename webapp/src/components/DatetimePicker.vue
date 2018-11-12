<template>
  <v-input :error-messages="errorMessage">
    <v-select outline :background-color="backgroundColor" :hide-details="true"
      label="Year"
      :items="yearItems"
      :value="date.getFullYear()"
      @input="year => {
        $emit('update', getCorrectedDate(date, { year }));
      }"
    ></v-select>
    <v-select outline :background-color="backgroundColor" :hide-details="true"
      label="Month"
      :items="monthItems"
      :value="date.getMonth() + 1"
      @input="month => {
        $emit('update', getCorrectedDate(date, { month }));
      }"
    ></v-select>
    <v-select outline :background-color="backgroundColor" :hide-details="true"
      label="Day"
      :items="dayItems"
      :value="date.getDate()"
      @input="day => {
        $emit('update', getCorrectedDate(date, { day }));
      }"
    ></v-select>
    <v-select outline :background-color="backgroundColor" :hide-details="true"
      label="Hour"
      :items="hourItems"
      :value="date.getHours()"
      @input="hour => {
        $emit('update', getCorrectedDate(date, { hour }));
      }"
    ></v-select>
    <v-select outline :background-color="backgroundColor" :hide-details="true"
      label="Minute"
      :items="[ '00' ]"
      :value="'00'"
    ></v-select>
  </v-input>
</template>

<script>
import Calendar from '../../kalendar/src/Calendar';

export default {
  model: {
    prop: 'date',
    event: 'update',
  },
  props: {
    backgroundColor: String,
    label: String,
    date: {
      type: Date,
      required: true,
    },
    errorMessage: String,
  },
  data() {
    return {
      monthItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      hourItems: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      ],
    };
  },
  computed: {
    yearItems() {
      const year = this.date.getFullYear();
      let index = 0;
      const items = [];
      for (let offset = -10; offset < 10; offset += 1) {
        items[index] = year + offset;
        index += 1;
      }
      return items;
    },
    dayItems() {
      const last = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
      const length = last.getDate();
      const items = [];
      for (let day = 1; day <= length; day += 1) {
        items[day - 1] = day;
      }
      return items;
    },
  },
  methods: {
    getCorrectedDate(date, correct) {
      return Calendar.getCorrectedDate(date, correct);
    },
  },
};
</script>
