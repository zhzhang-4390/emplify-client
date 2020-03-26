<template>
  <header class="py-4 flex justify-between items-center">
    <router-link to="/" class="flex items-center">
      <img src="../assets/logo.png" class="h-12 w-12" />
      <h1 class="ml-2 text-2xl font-bold text-gray-800 font-serif">Emplify</h1>
      <h5 class="self-end ml-2 text-gray-600">Beta</h5>
    </router-link>
    <ul class="flex items-center">
      <li v-if="$store.getters.isBuyer" class="ml-16 flex items-center">
        <router-link to="/shopping-cart" class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="h-6 w-6 fill-current text-gray-900"
          >
            <path
              d="M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            />
          </svg>
          <div
            v-if="$store.getters.getShoppingCartSize !== 0"
            class="ml-2 h-6 w-6 rounded-full bg-teal-400 flex items-center justify-center text-white"
          >{{ $store.getters.getShoppingCartSize }}</div>
        </router-link>
      </li>

      <li v-if="$store.getters.isBuyer" class="ml-16">
        <router-link
          to="/favourites"
          class="text-lg font-semibold hover:text-gray-600 cursor-pointer"
        >Favourites</router-link>
      </li>

      <li v-if="$store.getters.isBuyer" class="ml-16">
        <router-link
          to="/orders"
          class="text-lg font-semibold hover:text-gray-600 cursor-pointer"
        >Orders</router-link>
      </li>

      <li v-if="$store.getters.isSeller" class="ml-16">
        <router-link
          to="/my-products"
          class="text-lg font-semibold hover:text-gray-600 cursor-pointer"
        >My Products</router-link>
      </li>

      <li v-if="$store.getters.getUser" class="ml-16">
        <a class="text-lg font-semibold hover:text-gray-600 cursor-pointer">Chats</a>
      </li>

      <li class="ml-16">
        <div
          @click="$store.dispatch('showContactForm')"
          class="text-lg font-semibold hover:text-gray-600 cursor-pointer"
        >Contact Us</div>
      </li>

      <li class="ml-16 relative">
        <div
          v-if="$store.getters.getUser"
          @click="showAccountDropdown = !showAccountDropdown"
          class="h-12 w-12 rounded-full bg-teal-400 hover:bg-teal-300 transition-colors duration-300 border-2 border-white cursor-pointer flex items-center justify-center text-xl text-white"
        >{{ $store.getters.getUser.email.charAt(0).toUpperCase() }}</div>

        <div
          v-else
          @click="$store.dispatch('showSignInForm')"
          class="py-2 px-6 rounded-full border-2 border-gray-700 text-lg font-semibold hover:bg-gray-100 cursor-pointer"
        >Sign In</div>

        <transition name="scale">
          <ul
            v-show="showAccountDropdown"
            class="mt-4 absolute z-20 right-0 w-48 bg-white rounded-lg shadow-lg"
            style="transform-origin: 100% 0%"
          >
            <li
              @click="signOut()"
              class="p-4 rounded-t-lg hover:bg-teal-300 cursor-pointer"
            >Sign Out</li>
            <li class="p-4 rounded-b-lg hover:bg-teal-300 cursor-pointer">Change Password</li>
          </ul>
        </transition>
      </li>
    </ul>
  </header>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showAccountDropdown: false
    };
  },

  methods: {
    signOut() {
      this.showAccountDropdown = !this.showAccountDropdown;
      axios.post("/userService/signOut").then(res => {
        if (res.status === 200) {
          this.$store.dispatch("signOut");
          this.$store.dispatch("pushGoodNews", "Signed out successfully!");
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
        } else {
          this.$store.dispatch("pushBadNews", "Failed to sign out");
        }
      });
    }
  }
};
</script>
