<template>
  <div>
    <section class="flex">
      <router-link
        to="/upload-product"
        class="py-2 px-4 rounded-lg border border-gray-800 hover:bg-gray-300 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="h-6 w-6 fill-current text-gray-800 cursor-pointer"
        >
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
          />
        </svg>

        <span class="ml-4 font-semibold text-gray-800">Upload New Product</span>
      </router-link>
    </section>

    <table class="mt-8 w-full">
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
          <td class="py-2 px-4 border-2 text-sm">
            {{ new Date(product.updatedAt).toLocaleString() }}
          </td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },

  created() {
    axios.get("/productService/getAllProductsForTable").then((res) => {
      this.products = res.data;
    });
  },
};
</script>
