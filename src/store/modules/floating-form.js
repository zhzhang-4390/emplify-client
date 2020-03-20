export default {
  state: {
    showSignInForm: false,
    showContactForm: false
  },

  mutations: {
    toggleSignInForm(state, show) {
      state.showSignInForm = show;
    },

    toggleContactForm(state, show) {
      state.showContactForm = show;
    }
  },

  actions: {
    showSignInForm(context) {
      context.commit("toggleSignInForm", true);
    },

    hideSignInForm(context) {
      context.commit("toggleSignInForm", false);
    },

    showContactForm(context) {
      context.commit("toggleContactForm", true);
    },

    hideContactForm(context) {
      context.commit("toggleContactForm", false);
    }
  },

  getters: {
    showSignInForm(state) {
      return state.showSignInForm;
    },

    showContactForm(state) {
      return state.showContactForm;
    },

    showBlurPane(state) {
      return state.showSignInForm || state.showContactForm;
    }
  }
};
