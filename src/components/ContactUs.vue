<template>
  <div class="flex flex-col items-center justify-center">
    <CloseButton @close="$store.dispatch('hideContactForm')" class="w-3/5" />
    <form class="p-12 w-3/5 bg-white rounded-b-lg shadow-xl">
      <div class="flex">
        <input
          v-model="company"
          type="text"
          placeholder="Company & Department"
          required
          class="py-2 w-1/2 outline-none border-b focus:border-teal-400"
        />
        <input
          v-model="name"
          type="text"
          placeholder="Your Name"
          required
          class="ml-8 py-2 w-1/2 outline-none border-b focus:border-teal-400"
        />
      </div>
      <div class="mt-8 flex">
        <input
          v-model="email"
          type="text"
          placeholder="Email"
          required
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
      <label class="mt-10 flex items-center">
        <input v-model="role" type="radio" name="role" value="buyer" class="h-6 w-6" />
        <span class="ml-4 text-gray-800">I'm looking for Team-Building / CSR activites</span>
      </label>
      <label class="mt-6 flex items-center">
        <input v-model="role" type="radio" name="role" value="seller" class="h-6 w-6" />
        <span class="ml-4 text-gray-800">I'm an activity / venue provider</span>
      </label>
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
import CloseButton from "./CloseButton.vue";

export default {
  components: {
    CloseButton
  },

  data() {
    return {
      company: null,
      name: null,
      email: null,
      contactNumber: null,
      requirement: null,
      role: "buyer"
    };
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
          role: this.role
        })
        .then(res => {
          if (res.status === 201) {
            this.$store.dispatch(
              "pushGoodNews",
              "Request submitted successfully! We'll get in touch with you soon"
            );
          } else {
            this.$store.dispatch("pushBadNews", "Failed to submit request");
          }
        });
    }
  }
};
</script>
