<template>
  <v-tabs-items :value="$store.state.viewId">
    <v-tab-item id="#monthly">
      <kalendar-monthly-body v-if="monthly"
        @update:currentDate="changeCurrentDate"
        :currentDate="$store.state.currentDate"
        :loadEventsPromise="loadEventsByPeriod"
      ></kalendar-monthly-body>
    </v-tab-item>
    <v-tab-item id="#weekly">
      <kalendar-weekly-body
        @update:currentDate="changeCurrentDate"
        :currentDate="$store.state.currentDate"
        :loadEventsPromise="loadEventsByPeriod"
      ></kalendar-weekly-body>
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { CHANGE_CURRENT_DATE } from '@/store';
import EventService from '@/services/EventService';

export default {
  name: 'calendar-viewer',
  computed: {
    monthly() {
      return this.$store.state.viewId === '#monthly';
    },
  },
  methods: {
    changeCurrentDate(date) {
      this.$store.commit({
        type: CHANGE_CURRENT_DATE,
        currentDate: date,
      });
    },
    loadEventsByPeriod(startDate, endDate) {
      return new Promise((resolve, reject) => {
        EventService.searchEventsByPeriod(startDate, endDate).then((response) => {
          // eslint-disable-next-line
          resolve(response.data._embedded.events);
        }).catch((error) => {
          console.error(error);
          reject(error);
        });
      });
    },
  },
};
</script>
