import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const CHANGE_VIEW_ID = 'CHANGE_VIEW_ID';
export const CHANGE_CURRENT_DATE = 'CHANGE_CURRENT_DATE';

export default new Vuex.Store({
  state: {
    viewId: null,
    currentDate: new Date(),
  },
  mutations: {
    CHANGE_VIEW_ID(state, payload) {
      state.viewId = payload.viewId;
    },
    CHANGE_CURRENT_DATE(state, payload) {
      state.currentDate = payload.currentDate;
    },
  },
  actions: {

  },
});
