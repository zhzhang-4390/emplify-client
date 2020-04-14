<template>
  <div
    @keyup.esc="$store.dispatch('hideSignInForm')"
    tabindex="0"
    class="flex flex-col items-center justify-center"
  >
    <CloseButton @close="$store.dispatch('hideSignInForm')" class="w-1/3" />
    <form class="py-12 px-8 w-1/3 rounded-b-lg shadow-lg bg-white">
      <input
        v-model="email"
        ref="email"
        @keyup.enter="$refs.password.focus()"
        type="text"
        placeholder="Email"
        class="py-4 px-6 w-full rounded-full outline-none border focus:border-teal-400"
      />
      <input
        v-model="password"
        ref="password"
        @keyup.enter="signInMode ? signIn() : null"
        type="password"
        placeholder="Password"
        class="mt-8 py-4 px-6 w-full rounded-full outline-none border focus:border-teal-400"
      />

      <RoleRadioGroup v-if="!signInMode" v-model="role" class="mt-8" />

      <div
        @click="signInMode ? signIn() : signUp()"
        class="mt-8 py-4 w-full rounded-full border-2 border-teal-300 cursor-pointer hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
      >
        <span class="text-lg font-semibold text-gray-700">{{
          signInMode ? "Sign In" : "Sign Up"
        }}</span>
        <svg
          ref="cog"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="ml-4 h-5 w-5 fill-current text-gray-700"
        >
          <path
            d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          />
        </svg>
      </div>

      <div v-if="signInMode" class="mt-6 flex justify-between">
        <span class="hover:text-gray-600 cursor-pointer">Forgot Password?</span>
        <span
          @click="signInMode = false"
          class="hover:text-gray-600 cursor-pointer"
          >Sign Up</span
        >
      </div>

      <div v-if="!signInMode" class="mt-6 flex justify-end">
        <span
          @click="signInMode = true"
          class="hover:text-gray-600 cursor-pointer"
          >Sign In</span
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import anime from "animejs/lib/anime.es.js";

import CloseButton from "./icons/CloseButton.vue";
import RoleRadioGroup from "./icons/RoleRadioGroup.vue";

export default {
  components: {
    CloseButton,
    RoleRadioGroup,
  },

  data() {
    return {
      signInMode: true,

      email: null,
      password: null,
      role: "buyer",
    };
  },

  mounted() {
    this.$refs.email.focus();
  },

  methods: {
    signIn() {
      const rotateCog = this.rotateCog();
      rotateCog.play();

      axios
        .post("/userService/signIn", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          rotateCog.pause();

          if (res.status === 200) {
            this.$store.dispatch("signIn", res.data);
            this.$store.dispatch("hideSignInForm");
            if (res.data.role === "seller") {
              this.$router.push("/my-products");
            } else if (res.data.role === "admin") {
              this.$router.push("/admin/users");
            }
          }
        })
        .catch((err) => {
          rotateCog.pause();
          this.$store.dispatch("pushBadNews", "Wrong email or password");
        });
    },

    signUp() {
      axios
        .post("/userService/signUp", {
          email: this.email,
          password: this.password,
          role: this.role,
        })
        .then((res) => {
          if (res.status === 201) {
            this.$store.dispatch("pushGoodNews", "Signed up successfully!");
            this.$store.dispatch("hideSignInForm");
          }
        });
    },

    rotateCog() {
      return anime({
        targets: this.$refs.cog,
        rotate: "1turn",
        easing: "linear",
        duration: 1000,
        loop: true,
      });
    },
  },
};
</script>
