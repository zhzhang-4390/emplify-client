<template>
  <div
    @keyup.esc="$store.dispatch('hideContactForm')"
    tabindex="0"
    class="flex flex-col items-center justify-center"
  >
    <CloseButton @close="$store.dispatch('hideContactForm')" class="w-3/5" />
    <form class="p-12 w-3/5 bg-white rounded-b-lg shadow-xl">
      <div class="flex">
        <input
          v-model="company"
          ref="firstInput"
          type="text"
          placeholder="Company & Department"
          class="py-2 w-1/2 outline-none border-b focus:border-teal-400"
        />
        <input
          v-model="name"
          type="text"
          placeholder="Your Name"
          class="ml-8 py-2 w-1/2 outline-none border-b focus:border-teal-400"
        />
      </div>

      <div class="mt-8 flex">
        <input
          v-model="email"
          type="text"
          placeholder="Email"
          class="py-2 w-1/2 outline-none border-b focus:border-teal-400"
        />
        <input
          v-model="contactNumber"
          type="text"
          placeholder="Contact Number (Optional)"
          class="ml-8 py-2 w-1/2 outline-none border-b focus:border-teal-400"
        />
      </div>

      <input
        v-model="requirement"
        type="text"
        placeholder="Your Requirements (Optional)"
        class="mt-8 py-2 w-full outline-none border-b focus:border-teal-400"
      />

      <RoleRadioGroup v-model="role" class="mt-8" />

      <div
        @click="submitRequest()"
        class="mt-10 py-3 w-full rounded-full hover:bg-gray-200 transition-colors duration-300 border-2 border-teal-300 cursor-pointer flex justify-center"
      >
        <span class="text-xl text-gray-700 font-semibold">Submit</span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import CloseButton from "./icons/CloseButton.vue";
import RoleRadioGroup from "./icons/RoleRadioGroup.vue";

export default {
  components: {
    CloseButton,
    RoleRadioGroup,
  },

  data() {
    return {
      company: null,
      name: null,
      email: null,
      contactNumber: null,
      requirement: null,
      role: "buyer",
    };
  },

  mounted() {
    this.$refs.firstInput.focus();
  },

  methods: {
    submitRequest() {
      this.$store.dispatch("hideContactForm");

      axios
        .post("/requestService/addRequest", {
          company: this.company,
          name: this.name,
          email: this.email,
          contactNumber: this.contactNumber,
          requirement: this.requirement,
          role: this.role,
        })
        .then((res) => {
          if (res.status === 201) {
            this.$store.dispatch(
              "pushGoodNews",
              "Request submitted successfully! We'll get in touch with you soon"
            );
          } else {
            this.$store.dispatch("pushBadNews", "Failed to submit request");
          }
        });
    },
  },
};
</script>
