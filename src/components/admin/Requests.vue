<template>
  <table class="w-full">
    <thead>
      <tr>
        <th class="py-2 bg-gray-200 border-2">Company</th>
        <th class="py-2 bg-gray-200 border-2">Name</th>
        <th class="py-2 bg-gray-200 border-2">Email</th>
        <th class="py-2 bg-gray-200 border-2">Contact Number</th>
        <th class="py-2 bg-gray-200 border-2">Requirement</th>
        <th class="py-2 bg-gray-200 border-2">Role</th>
        <th class="py-2 bg-gray-200 border-2">Created At</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(request, index) in requests"
        :key="index"
        :class="{ 'bg-gray-200': index % 2 !== 0 }"
      >
        <td class="py-2 px-4 border-2 text-sm">{{ request.company }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ request.name }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ request.email }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ request.contactNumber }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ request.requirement }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ request.role }}</td>
        <td class="py-2 px-4 border-2 text-sm">
          {{ new Date(request.createdAt).toLocaleString() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [],
    };
  },

  created() {
    axios.get("/requestService/getAllRequests").then((res) => {
      this.requests = res.data;
    });
  },
};
</script>
