<template>
  <div class="py-10 flex border-b-2 border-gray-400 overflow-x-auto">
    <router-link
      to="/upload-product"
      class="w-84 flex-shrink-0 rounded-lg shadow-lg border-2 relative"
    >
      <div class="h-56 w-full"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="h-6 w-6 fill-current text-gray-600"
        >
          <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span class="ml-4 text-lg font-semibold text-gray-600"
          >Upload Product</span
        >
      </div>
      <div class="h-64 w-full"></div>
    </router-link>

    <div
      v-for="product in products"
      :key="product._id"
      class="ml-10 w-84 flex-shrink-0"
    >
      <router-link
        :to="{ path: '/upload-product', query: { name: product.name } }"
      >
        <ProductCard :product="product" />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "./ProductCard.vue";

export default {
  components: {
    ProductCard
  },

  data() {
    return {
      products: []
    };
  },

  created() {
    axios.get("/productService/getMyProducts").then(res => {
      this.products = res.data;
    });
  }
};
</script>
