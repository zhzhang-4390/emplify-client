export default {
  state: {
    user: null
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setShoppingCartSize(state, shoppingCartSize) {
      state.user.shoppingCartSize = shoppingCartSize;
    }
  },

  actions: {
    signIn(context, user) {
      context.commit("setUser", user);
    },

    signOut(context) {
      context.commit("setUser", null);
    },

    updateShoppingCartSize(context, shoppingCartSize) {
      context.commit("setShoppingCartSize", shoppingCartSize);
    }
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

    getShoppingCartSize(state) {
      return state.user ? state.user.shoppingCartSize : 0;
    }
  }
};
