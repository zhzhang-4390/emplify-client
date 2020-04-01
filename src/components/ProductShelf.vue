<template>
  <div>
    <section class="h-screen w-full">
      <Animation class="mt-36" />
    </section>

    <section
      v-for="category in $store.getters.getCategories"
      :key="category"
      class="pb-4 border-b-2 border-gray-600"
    >
      <div class="ml-1 mt-8 leading-loose">
        <h3 class="text-xl font-bold">{{ category }}</h3>
        <h4>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Reprehenderit expedita aperiam error doloribus dolore, non porro
        </h4>
      </div>
      <div class="py-10 flex overflow-x-auto">
        <div
          v-for="(product, index) in products.filter(
            product => product.category === category
          )"
          :key="index"
          class="w-84 flex-shrink-0"
          :class="{ 'ml-10': index !== 0 }"
        >
          <router-link :to="{ path: '/product-detail', query: { name: product.name } }">
            <ProductCard :product="product" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Animation from "./Animation.vue";
import ProductCard from "./ProductCard.vue";

export default {
  components: {
    Animation,
    ProductCard
  },

  data() {
    return {
      products: []
    };
  },

  created() {
    axios.get("/productService/getAllProductsForShelf").then(res => {
      this.products = res.data;
    });
  }
};
</script>
