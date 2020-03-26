<template>
  <div class="py-10 flex overflow-x-auto border-b-2 border-gray-600">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="w-84 flex-shrink-0"
      :class="{ 'ml-10': index !== 0 }"
    >
      <router-link :to="{ path: '/product-detail', query: { name: product.name } }">
        <ProductCard :product="product" />
      </router-link>

      <div class="mt-10 flex justify-center">
        <svg
          @click="removeFromShoppingCart(product._id)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="h-6 w-6 fill-current text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
        >
          <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
        </svg>
      </div>
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
    axios.get("/userService/getFavourites").then(res => {
      this.products = res.data;
    });
  },

  methods: {
    removeFromShoppingCart(_id) {
      this.products = this.products.filter(product => product._id !== _id);
      axios.post("/userService/removeFavourite", { _id: _id });
    }
  }
};
</script>
