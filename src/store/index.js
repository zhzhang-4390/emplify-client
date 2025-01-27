import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/user";
import notification from "./modules/notification";
import floatingForm from "./modules/floating-form";
import chats from "./modules/chats";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],

  modules: {
    user,
    notification,
    floatingForm,
    chats,
  },

  state: {
    categories: ["Team Building Experience", "CSR Experience", "Hotels"],
  },

  getters: {
    getCategories(state) {
      return state.categories;
    },
  },
});
