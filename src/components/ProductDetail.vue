<template>
  <div v-if="product" class="py-10 border-b border-gray-600">
    <div class="flex">
      <section class="w-1/3 rounded-lg relative">
        <img
          :src="product.frontImage"
          class="h-64 w-full object-cover rounded-t-lg"
        />

        <div class="p-6 h-96 relative bg-white rounded-b-lg leading-loose">
          <div class="flex">
            <h4 class="text-xl font-semibold text-gray-700">
              {{ product.name }}
            </h4>
            <div
              class="absolute right-0 p-4 bg-teal-400 rounded-l-lg shadow-lg"
            >
              <span class="text-xl font-semibold text-white"
                >$ {{ product.price }}</span
              >
              <span class="ml-2 text-white">/pax</span>
            </div>
          </div>

          <div
            class="mt-2 pl-2 text-sm text-gray-600 font-semibold border-l-4 border-teal-400"
          >
            {{ product.category }}
          </div>

          <p class="mt-4 h-32 text-gray-600 text-justify overflow-y-auto">
            {{ product.description }}
          </p>

          <div class="mt-8 flex items-end justify-between">
            <div
              @click="contactVendor()"
              class="text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="mt-1 h-4 w-4 fill-current"
              >
                <path
                  d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"
                />
              </svg>

              <span class="ml-2 font-semibold">Contact Vendor</span>
            </div>

            <div class="flex flex-col items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                @click="toggleFavourite()"
                class="h-8 w-8 fill-current transition-colors duration-300 cursor-pointer"
                :class="{
                  'text-gray-400 hover:text-gray-300': !isFavourite,
                  'text-teal-400 hover:text-teal-300': isFavourite,
                }"
              >
                <path
                  d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
                />
              </svg>

              <div
                v-if="!isInShoppingCart"
                @click="addToShoppingCart()"
                class="mt-4 py-1 px-4 rounded-lg bg-teal-400 hover:bg-teal-300 transition-colors duration-300 cursor-pointer flex justify-center font-semibold text-white"
              >
                Add to Cart
              </div>

              <div
                v-else
                class="mt-4 py-1 px-4 rounded-lg bg-gray-400 cursor-not-allowed flex justify-center font-semibold text-white"
              >
                Already in Cart
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="ml-16 w-2/3">
        <div class="flex overflow-x-hidden relative">
          <div
            @mouseenter="hoverOnBigImage = true"
            @mouseleave="hoverOnBigImage = false"
            class="absolute z-10 inset-0 w-full flex items-center justify-between"
          >
            <svg
              @click="slideLeft()"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="h-32 w-32 fill-current text-white transition-opacity duration-300 cursor-pointer"
              :class="{
                'opacity-0': !hoverOnBigImage,
                'opacity-50': hoverOnBigImage,
              }"
            >
              <path
                d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"
              />
            </svg>
            <svg
              @click="slideRight()"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="h-32 w-32 fill-current text-white transition-opacity duration-300 cursor-pointer"
              :class="{
                'opacity-0': !hoverOnBigImage,
                'opacity-50': hoverOnBigImage,
              }"
            >
              <path
                d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
              />
            </svg>
          </div>

          <img
            v-for="image in product.images"
            :key="image"
            :src="image"
            class="flex-shrink-0 h-124 w-full object-cover rounded-lg transform transition-transform duration-300"
            :style="{
              '--transform-translate-x': `-${selectedImageIndex * 100}%`,
            }"
          />
        </div>
        <div class="mt-4 h-32 w-full rounded-lg flex overflow-x-auto">
          <img
            v-for="(image, index) in product.images"
            :key="image"
            :src="image"
            @click="selectedImageIndex = index"
            class="mr-4 h-full w-48 object-cover rounded-lg cursor-pointer transition-opacity duration-500"
            :class="{ 'opacity-50': selectedImageIndex !== index }"
          />
        </div>
      </section>
    </div>

    <div
      class="mt-8 p-8 w-full bg-white rounded-lg leading-loose text-gray-600 font-semibold"
    >
      <p
        v-for="(detail, index) in product.details"
        :key="detail"
        :class="{ 'mt-8': index !== 0 }"
      >
        {{ detail }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: null,
      isFavourite: null,
      isInShoppingCart: null,

      hoverOnBigImage: false,
      selectedImageIndex: 0,
    };
  },

  created() {
    axios
      .get(`/productService/getProductByName?name=${this.$route.query.name}`)
      .then((res) => {
        this.product = res.data;

        if (this.$store.getters.getUser) {
          axios
            .get(`/userService/isFavourite?_id=${this.product._id}`)
            .then((res) => {
              this.isFavourite = res.data;
            });

          axios
            .get(`/userService/isInShoppingCart?_id=${this.product._id}`)
            .then((res) => {
              this.isInShoppingCart = res.data;
            });
        }
      });
  },

  methods: {
    contactVendor() {
      if (this.$store.getters.getUser) {
        this.$store.dispatch("initChat", this.product.owner);
        this.$router.push("/chats");
      } else {
        this.$store.dispatch("showSignInForm");
      }
    },

    toggleFavourite() {
      if (this.$store.getters.getUser) {
        this.isFavourite = !this.isFavourite;
        if (this.isFavourite) {
          axios.post("/userService/addFavourite", { _id: this.product._id });
        } else {
          axios.post("/userService/removeFavourite", { _id: this.product._id });
        }
      } else {
        this.$store.dispatch("showSignInForm");
      }
    },

    addToShoppingCart() {
      if (this.$store.getters.getUser) {
        this.isInShoppingCart = true;
        axios
          .post("/userService/addToShoppingCart", { _id: this.product._id })
          .then((res) =>
            this.$store.dispatch(
              "updateShoppingCartSize",
              res.data.shoppingCartSize
            )
          );
      } else {
        this.$store.dispatch("showSignInForm");
      }
    },

    slideLeft() {
      if (this.selectedImageIndex > 0) {
        this.selectedImageIndex--;
      }
    },

    slideRight() {
      if (this.selectedImageIndex < this.product.images.length - 1) {
        this.selectedImageIndex++;
      }
    },
  },
};
</script>
