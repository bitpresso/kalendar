<template>
  <v-tabs-items :value="$store.state.viewId">
    <v-tab-item id="#monthly">
      <kalendar-monthly-body :value="$store.state.selectedDate"></kalendar-monthly-body>
    </v-tab-item>
    <v-tab-item id="#weekly">
      <kalendar-weekly-body :value="$store.state.selectedDate"></kalendar-weekly-body>
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  name: 'calendar-viewer',
};
</script>
