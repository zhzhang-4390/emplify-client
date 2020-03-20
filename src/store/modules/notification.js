export default {
  state: {
    notification: null
  },

  mutations: {
    setNotification(state, notification) {
      state.notification = notification;
    }
  },

  actions: {
    pushGoodNews(context, message) {
      context.commit("setNotification", { isGoodNews: true, message: message });
    },

    pushBadNews(context, message) {
      context.commit("setNotification", {
        isGoodNews: false,
        message: message
      });
    },

    dismissNotification(context) {
      context.commit("setNotification", null);
    }
  },

  getters: {
    getNotification(state) {
      return state.notification;
    },

    getIfGoodNews(state) {
      return state.notification && state.notification.isGoodNews;
    },

    getMessage(state) {
      return state.notification ? state.notification.message : null;
    }
  }
};
