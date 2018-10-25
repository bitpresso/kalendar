<template>
  <kalendar v-model="selectedDate" :openDatePicker="openDatePicker"></kalendar>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      selectedDate: new Date(2018, 7, 1),
    };
  },
  watch: {
    selectedDate() {
      console.log('selectedDate:', this.selectedDate.toLocaleDateString());
    },
  },
  methods: {
    openDatePicker() {
      window.alert('date picker');
    },
  },
};
</script>
