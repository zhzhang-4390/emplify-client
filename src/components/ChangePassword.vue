<template>
  <div class="py-10 rounded-lg bg-gray-100 flex items-center justify-center">
    <section>
      <input
        v-model="currentPassword"
        type="password"
        placeholder="Current Password"
        class="block mt-8 w-84 py-4 px-6 bg-gray-200 rounded-full outline-none border focus:border-teal-400"
      />

      <input
        v-model="newPassword"
        type="password"
        placeholder="New Password"
        class="block mt-8 w-84 py-4 px-6 bg-gray-200 rounded-full outline-none border focus:border-teal-400"
      />

      <input
        v-model="retypedNewPassword"
        @input="match = newPassword === retypedNewPassword"
        type="password"
        placeholder="Retype New Password"
        class="block mt-8 w-84 py-4 px-6 bg-gray-200 rounded-full outline-none border"
        :class="{
          'focus:border-teal-400': match,
          'focus:border-red-600': !match,
        }"
      />

      <button
        @click="changePassword()"
        :disabled="!match"
        class="my-8 py-4 w-84 rounded-full focus:outline-none border border-teal-400 flex justify-center text-gray-800 font-semibold"
        :class="{ 'hover:bg-gray-200': match, 'cursor-not-allowed': !match }"
      >
        Change Password
      </button>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      match: false,

      currentPassword: null,
      newPassword: null,
      retypedNewPassword: null,
    };
  },

  methods: {
    changePassword() {
      axios
        .post("/userService/changePassword", {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$store.dispatch(
              "pushGoodNews",
              "Password updated successfully!"
            );
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.$store.dispatch("pushBadNews", "Current password incorrect");
          } else {
            this.$store.dispatch("pushBadNews", "Failed to update password");
          }
        });
    },
  },
};
</script>
