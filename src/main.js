import Vue from "vue";
import VueRouter from "vue-router";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

import App from "./App.vue";
import store from "./store";
import "./assets/css/tailwind.css";

import ProductShelf from "./components/ProductShelf.vue";
import ProductDetail from "./components/ProductDetail.vue";
import UploadProduct from "./components/UploadProduct.vue";
import MyProducts from "./components/MyProducts.vue";
import Favourites from "./components/Favourites.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import Chats from "./components/Chats.vue";
import ChangePassword from "./components/ChangePassword.vue";
import Admin from "./components/Admin.vue";
import Users from "./components/admin/Users.vue";
import Products from "./components/admin/Products.vue";
import Requests from "./components/admin/Requests.vue";

Vue.use(VueRouter);
Vue.use(VueSocketIOExt, io("18.140.52.250:8080", { autoConnect: false }), {
  store,
});

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: ProductShelf,
    },
    {
      path: "/product-detail",
      component: ProductDetail,
    },
    {
      path: "/upload-product",
      component: UploadProduct,
    },
    {
      path: "/my-products",
      component: MyProducts,
    },
    {
      path: "/favourites",
      component: Favourites,
    },
    {
      path: "/shopping-cart",
      component: ShoppingCart,
    },
    {
      path: "/chats",
      component: Chats,
    },
    {
      path: "/change-password",
      component: ChangePassword,
    },
    {
      path: "/admin",
      component: Admin,
      children: [
        { path: "users", component: Users },
        { path: "products", component: Products },
        { path: "requests", component: Requests },
      ],
    },
  ],
  mode: "history",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
