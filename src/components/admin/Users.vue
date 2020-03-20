<template>
  <table class="w-full">
    <thead>
      <tr>
        <th class="py-2 bg-gray-200 border-2">Email</th>
        <th class="py-2 bg-gray-200 border-2">Role</th>
        <th class="py-2 bg-gray-200 border-2">Created At</th>
        <th class="py-2 bg-gray-200 border-2">Updated At</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index" :class="{ 'bg-gray-200': index % 2 !== 0 }">
        <td class="py-2 px-4 border-2">{{ user.email }}</td>
        <td class="py-2 px-4 border-2">{{ user.role }}</td>
        <td class="py-2 px-4 border-2">{{ user.createdAt }}</td>
        <td class="py-2 px-4 border-2">{{ user.updatedAt }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: []
    };
  },

  created() {
    axios.get("/userService/getAllUsers").then(res => (this.users = res.data));
  }
};
</script>
