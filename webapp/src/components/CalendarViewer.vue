<template>
  <v-tabs-items :value="$store.state.viewId">
    <v-tab-item id="#monthly">
      Monthly Tab
    </v-tab-item>
    <v-tab-item id="#weekly">
      Weekly Tab
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  name: 'calendar-viewer',
};
</script>
