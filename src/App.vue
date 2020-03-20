<template>
  <div id="app" class="relative">
    <!-- <div class="h-full w-full">
      <img src="./assets/wallpaper.jpg" class="object-cover absolute" />
      <div
        class="h-screen w-full absolute"
        style="background: linear-gradient(to bottom, #edf2f7, transparent, #edf2f7)"
      ></div>
    </div>-->
    <div>
      <Header
        @showContactForm="showContactForm = !showContactForm"
        class="sticky z-20 top-0 px-32 shadow-lg"
      />
      <router-view class="px-32"></router-view>
      <Footer class="px-32" />
    </div>

    <transition name="fade">
      <div v-if="$store.getters.showBlurPane" class="fixed z-30 inset-0 bg-gray-100"></div>
    </transition>

    <ContactUs
      class="fixed z-30 inset-0 transform transition-transform duration-300"
      :class="{ 'scale-0': !$store.getters.showContactForm, 'scale-100': $store.getters.showContactForm }"
      style="transform-origin: 78% 7%"
    />

    <SignIn
      class="fixed z-30 inset-0 transform transition-transform duration-300"
      :class="{ 'scale-0': !$store.getters.showSignInForm, 'scale-100': $store.getters.showSignInForm }"
      style="transform-origin: 88% 7%"
    />

    <Notification
      class="fixed z-40 bottom-0 transform transition-transform duration-300"
      :class="{ 'scale-0': !$store.getters.getNotification, 'scale-100': $store.getters.getNotification }"
      style="transform-origin: 50% 25%"
    />
  </div>
</template>

<script>
import axios from "axios";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ContactUs from "./components/ContactUs.vue";
import SignIn from "./components/SignIn.vue";
import Notification from "./components/Notification.vue";

export default {
  components: {
    Header,
    Footer,
    ContactUs,
    SignIn,
    Notification
  },

  data() {
    return {
      show: false,
      showContactForm: false
    };
  }
};
</script>

<style>
.h-96 {
  height: 24rem;
}

.h-124 {
  height: 31rem;
}

.w-84 {
  width: 21rem;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
