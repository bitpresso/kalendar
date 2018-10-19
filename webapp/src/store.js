import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const CHANGE_VIEW_ID = 'CHANGE_VIEW_ID';
export const CHANGE_SELECTED_DATE = 'CHANGE_SELECTED_DATE';

export default new Vuex.Store({
  state: {
    viewId: null,
    selectedDate: new Date(),
  },
  mutations: {
    CHANGE_VIEW_ID(state, payload) {
      state.viewId = payload.viewId;
    },
    CHANGE_SELECTED_DATE(state, payload) {
      const year = Number(payload.year);
      const month = Number(payload.month - 1);
      const day = (payload.day !== undefined)
        ? Number(payload.day)
        : state.selectedDate.getDate();
      state.selectedDate = new Date(year, month, day);
    },
  },
  actions: {

  },
});
