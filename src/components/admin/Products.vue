<template>
  <table class="w-full">
    <thead>
      <tr>
        <th class="py-2 bg-gray-200 border-2">Name</th>
        <th class="py-2 bg-gray-200 border-2">Category</th>
        <th class="py-2 bg-gray-200 border-2">Location</th>
        <th class="py-2 bg-gray-200 border-2">Price</th>
        <th class="py-2 bg-gray-200 border-2">Owner</th>
        <th class="py-2 bg-gray-200 border-2">Updated At</th>
      </tr>
    </thead>
    <tbody>
      <router-link
        v-for="(product, index) in products"
        :key="index"
        :to="{ path: '/upload-product', query: { name: product.name } }"
        class="hover:bg-gray-400"
        :class="{ 'bg-gray-200': index % 2 !== 0 }"
        style="display: table-row"
      >
        <td class="py-2 px-4 border-2 text-sm">{{ product.name }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ product.category }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ product.location }}</td>
        <td class="py-2 px-4 border-2 text-sm">$ {{ product.price }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ product.owner.email }}</td>
        <td class="py-2 px-4 border-2 text-sm">{{ product.updatedAt }}</td>
      </router-link>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: []
    };
  },

  created() {
    axios.get("/productService/getAllProductsForTable").then(res => {
      this.products = res.data;
    });
  }
};
</script>
