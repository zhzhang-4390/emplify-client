import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/user";
import notification from "./modules/notification";
import floatingForm from "./modules/floating-form";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],

  modules: {
    user,
    notification,
    floatingForm
  },

  state: {
    categories: ["Team Building Experience", "CSR Experience", "Hotels"]
  },

  getters: {
    getCategories(state) {
      return state.categories;
    }
  }
});
