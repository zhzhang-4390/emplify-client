<template>
  <div>
    <section class="flex items-center">
      <svg
        @click="
          miniFormOpen = !miniFormOpen;
          $refs.email.focus();
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="h-8 w-8 fill-current text-gray-800 cursor-pointer"
      >
        <path
          d="M2 6H0v2h2v2h2V8h2V6H4V4H2v2zm7 0a3 3 0 0 1 6 0v2a3 3 0 0 1-6 0V6zm11 9.14A15.93 15.93 0 0 0 12 13c-2.91 0-5.65.78-8 2.14V18h16v-2.86z"
        />
      </svg>

      <form
        class="ml-8 w-full flex items-center justify-between transition-transform duration-300"
        style="transform-origin: 0% 50%"
        :style="{ transform: miniFormOpen ? 'scale(1, 1)' : 'scale(0, 1)' }"
      >
        <input
          v-model="newUser.email"
          ref="email"
          type="text"
          placeholder="Email"
          class="py-2 px-3 rounded-lg bg-gray-300 outline-none"
          style="width: 23%"
        />

        <input
          v-model="newUser.password"
          type="password"
          placeholder="Password"
          class="py-2 px-3 rounded-lg bg-gray-300 outline-none"
          style="width: 23%"
        />

        <select
          v-model="newUser.role"
          class="py-2 px-3 rounded-lg bg-gray-300 text-gray-600 font-semibold outline-none"
          style="width: 23%"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        <div
          @click="addUser()"
          class="py-2 rounded-lg bg-teal-400 cursor-pointer flex justify-center text-white font-semibold"
          style="width: 23%"
        >
          Save
        </div>
      </form>
    </section>

    <table class="mt-8 w-full">
      <thead>
        <tr>
          <th class="py-2 bg-gray-200 border-2">Email</th>
          <th class="py-2 bg-gray-200 border-2">Role</th>
          <th class="py-2 bg-gray-200 border-2">Created At</th>
          <th class="py-2 bg-gray-200 border-2">Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="index"
          :class="{ 'bg-gray-200': index % 2 !== 0 }"
        >
          <td class="py-2 px-4 border-2">{{ user.email }}</td>
          <td class="py-2 px-4 border-2">{{ user.role }}</td>
          <td class="py-2 px-4 border-2">
            {{ new Date(user.createdAt).toLocaleString() }}
          </td>
          <td class="py-2 px-4 border-2">
            {{ new Date(user.updatedAt).toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      miniFormOpen: false,
      newUser: {
        email: null,
        password: null,
        role: "buyer",
      },
      users: [],
    };
  },

  created() {
    axios
      .get("/userService/getAllUsers")
      .then((res) => (this.users = res.data));
  },

  methods: {
    addUser() {
      axios.post("/userService/signUp", this.newUser).then((res) => {
        if (res.status === 201) {
          this.$store.dispatch("pushGoodNews", "Signed up successfully!");

          axios
            .get("/userService/getAllUsers")
            .then((res) => (this.users = res.data));

          this.newUser.email = null;
          this.newUser.password = null;
        }
      });
    },
  },
};
</script>
