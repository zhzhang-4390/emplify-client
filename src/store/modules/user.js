export default {
  state: {
    user: null,
    signInTime: null,
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setSignInTime(state, signInTime) {
      state.signInTime = signInTime;
    },

    setShoppingCartSize(state, shoppingCartSize) {
      state.user.shoppingCartSize = shoppingCartSize;
    },
  },

  actions: {
    signIn(context, user) {
      context.commit("setUser", user);
      context.commit("setSignInTime", Date.now());
    },

    signOut(context) {
      context.commit("setUser", null);
      context.commit("setSignInTime", null);
    },

    trySignOut(context) {
      if (Date.now() - context.getters.getSignInTime >= 86400000) {
        context.dispatch("signOut");
      }
    },

    updateShoppingCartSize(context, shoppingCartSize) {
      context.commit("setShoppingCartSize", shoppingCartSize);
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    isAdmin(state) {
      return state.user && state.user.role === "admin";
    },

    isSeller(state) {
      return state.user && state.user.role === "seller";
    },

    isBuyer(state) {
      return state.user && state.user.role === "buyer";
    },

    getSignInTime(state) {
      return state.signInTime;
    },

    getShoppingCartSize(state) {
      return state.user ? state.user.shoppingCartSize : 0;
    },
  },
};
