<template>
  <div>
    <div class="kalendar-toolbar" style="position: fixed;">
      <div class="toolbar-spacer"></div>
      <button class="toolbar-button round" @click="handleClickPrev">&lt;</button>
      <button class="toolbar-date" @click="handleClickDate">{{dateString}}</button>
      <button class="toolbar-button round" @click="handleClickNext">&gt;</button>
      <div class="toolbar-spacer"></div>
      <div class="toolbar-toggle">
        <button class="toolbar-toggle-item"
          :class="{ active: currentView === 'monthly' }"
          @click="updateCurrentView('monthly')"
        >Monthly</button>
        <button class="toolbar-toggle-item"
          :class="{ active: currentView === 'weekly' }"
          @click="updateCurrentView('weekly')"
        >Weekly</button>
      </div>
    </div>
    <div class="kalendar-toolbar"></div>
  </div>
</template>

<script>
export default {
  name: 'kalendar-toolbar',
  model: {
    prop: 'current-view',
    event: 'update:current-view',
  },
  props: {
    currentView: {
      type: String, // ['monthly' | 'weekly']
      default: () => 'monthly',
    },
    currentDate: {
      type: Date,
    },
  },
  computed: {
    dateString() {
      return (!this.currentDate) ? null : this.currentDate.toLocaleDateString();
    },
  },
  methods: {
    handleClickDate() {
      this.$emit('click:date');
    },
    handleClickPrev() {
      this.$emit('click:prev');
    },
    handleClickNext() {
      this.$emit('click:next');
    },
    updateCurrentView(view) {
      this.$emit('update:current-view', view);
    },
  },
};
</script>

<style scoped>
.kalendar-toolbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.kalendar-toolbar .toolbar-spacer {
  flex: 1;
}
</style>
