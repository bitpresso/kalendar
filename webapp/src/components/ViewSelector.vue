<template>
  <v-tabs color="yellow" slider-color="brown" v-model="viewName">
    <v-tab href="#monthly">
      <v-icon left>apps</v-icon>
    </v-tab>
    <v-tab href="#weekly">
      <v-icon>view_column</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
import { CHANGE_VIEW_ID } from '@/store';

export default {
  name: 'view-selector',
  data() {
    return {
      viewName: null,
    };
  },
  watch: {
    viewName(newValue) {
      this.$store.commit({
        type: CHANGE_VIEW_ID,
        viewId: (newValue) ? `#${newValue}` : null,
      });
    },
  },
  mounted() {
    const { hash } = this.$route;
    this.viewName = hash.substring(1, hash.length) || 'monthly';
  },
};
</script>
