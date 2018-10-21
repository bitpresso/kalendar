<template>
  <v-tabs-items :value="$store.state.viewId">
    <v-tab-item id="#monthly">
      <kalendar-monthly-body
        :selectedDate="$store.state.selectedDate"
        @update:selectedDate="changeSelectedDate"
      ></kalendar-monthly-body>
    </v-tab-item>
    <v-tab-item id="#weekly">
      <kalendar-weekly-body
        :selectedDate="$store.state.selectedDate"
        @update:selectedDate="changeSelectedDate"
      ></kalendar-weekly-body>
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { CHANGE_SELECTED_DATE } from '@/store';

export default {
  name: 'calendar-viewer',
  methods: {
    changeSelectedDate(selectedDate) {
      this.$store.commit({
        type: CHANGE_SELECTED_DATE,
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      });
    },
  },
};
</script>
