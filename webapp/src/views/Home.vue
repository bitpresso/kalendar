<template>
  <v-content>
    <v-toolbar app dense tabs color="yellow">
      <v-toolbar-side-icon>
        <a href="https://github.com/bitpresso/kalendar">
          <img width="24px" height="24" src="../assets/github.svg"/>
        </a>
      </v-toolbar-side-icon>
      <v-toolbar-title>K:alendar</v-toolbar-title>
      <v-spacer></v-spacer>
        <date-controller></date-controller>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <view-selector></view-selector>
      </v-toolbar-items>
    </v-toolbar>
    <calendar-viewer></calendar-viewer>
  </v-content>
</template>

<script>
import DateController from '@/components/DateController.vue';
import ViewSelector from '@/components/ViewSelector.vue';
import CalendarViewer from '@/components/CalendarViewer.vue';

export default {
  name: 'home',
  components: {
    DateController,
    ViewSelector,
    CalendarViewer,
  },
};
</script>

<style scoped>

</style>
