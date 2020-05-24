<template>
  <header
    class="py-4 border-b border-gray-600 flex justify-between items-center"
  >
    <router-link to="/" class="flex items-center">
      <img src="../assets/logo.png" class="h-10 w-10" />
      <h1 class="ml-4 text-xl font-bold text-gray-800 font-serif">Emplify</h1>
      <h5 class="self-end ml-2 text-sm text-gray-600">Beta</h5>
    </router-link>
    <ul class="flex items-center">
      <li v-if="$store.getters.isBuyer" class="ml-16 flex items-center">
        <router-link to="/shopping-cart" class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="h-5 w-5 fill-current text-gray-900 hover:text-gray-600"
          >
            <path
              d="M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            />
          </svg>
        </router-link>

        <div
          v-if="$store.getters.getShoppingCartSize !== 0"
          class="ml-2 h-5 w-5 rounded-full bg-teal-400 flex items-center justify-center text-xs text-white"
        >
          {{ $store.getters.getShoppingCartSize }}
        </div>
      </li>

      <li v-if="$store.getters.isBuyer" class="ml-16">
        <router-link
          to="/favourites"
          class="font-semibold hover:text-gray-600 cursor-pointer"
          >Favourites</router-link
        >
      </li>

      <li v-if="$store.getters.isBuyer" class="ml-16">
        <router-link
          to="/orders"
          class="font-semibold hover:text-gray-600 cursor-pointer"
          >Orders</router-link
        >
      </li>

      <li v-if="$store.getters.isSeller" class="ml-16">
        <router-link
          to="/my-products"
          class="font-semibold hover:text-gray-600 cursor-pointer"
          >My Products</router-link
        >
      </li>

      <li v-if="$store.getters.getUser" class="ml-16 flex items-center">
        <router-link
          to="/chats"
          class="font-semibold hover:text-gray-600 cursor-pointer"
          >Chats</router-link
        >
        <div
          v-if="$store.getters.getUnreadMessageCount !== 0"
          class="ml-2 h-5 w-5 rounded-full bg-teal-400 flex items-center justify-center text-xs text-white"
        >
          {{ $store.getters.getUnreadMessageCount }}
        </div>
      </li>

      <li class="ml-16">
        <div
          @click="$store.dispatch('showContactForm')"
          class="font-semibold hover:text-gray-600 cursor-pointer"
        >
          Contact Us
        </div>
      </li>

      <li class="ml-16 relative">
        <div
          v-if="$store.getters.getUser"
          @click="showAccountDropdown = !showAccountDropdown"
          class="h-10 w-10 rounded-full bg-teal-400 hover:bg-teal-300 transition-colors duration-300 border-2 border-white cursor-pointer flex items-center justify-center"
        >
          <span class="font-semibold text-white">{{
            $store.getters.getUser.name.charAt(0).toUpperCase()
          }}</span>
        </div>

        <div
          v-else
          @click="$store.dispatch('showSignInForm')"
          class="py-2 px-6 rounded-full border-2 border-gray-700 font-semibold hover:bg-gray-100 cursor-pointer"
        >
          Sign In
        </div>

        <transition name="scale">
          <ul
            v-show="showAccountDropdown"
            class="mt-4 absolute z-20 right-0 w-48 bg-white rounded-lg shadow-lg"
            style="transform-origin: 100% 0%"
          >
            <li
              @click="signOut()"
              class="p-4 rounded-t-lg hover:bg-teal-300 cursor-pointer"
            >
              Sign Out
            </li>

            <li
              @click="routeToChangePassword()"
              class="p-4 rounded-b-lg hover:bg-teal-300 cursor-pointer"
            >
              Change Password
            </li>
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
      showAccountDropdown: false,
    };
  },

  methods: {
    signOut() {
      this.showAccountDropdown = !this.showAccountDropdown;
      axios.post("/userService/signOut").then((res) => {
        if (res.status === 200) {
          this.$store.dispatch("signOut");
          this.$store.dispatch("pushGoodNews", "Signed out successfully!");

          if (this.$route.path !== "/") {
            this.$router.push("/");
          }

          this.$socket.client.disconnect();
        } else {
          this.$store.dispatch("pushBadNews", "Failed to sign out");
        }
      });
    },

    routeToChangePassword() {
      this.showAccountDropdown = false;
      this.$router.push("/change-password");
    },
  },
};
</script>
