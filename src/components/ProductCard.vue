<template>
  <div class="p-1 rounded-lg border border-gray-400 relative">
    <img :src="product.frontImage" class="h-56 w-84 object-cover rounded-t-lg" />
    <div
      class="absolute -mt-8 ml-4 h-16 w-16 rounded-full bg-teal-400 border-4 border-white flex items-center justify-center"
    >
      <span class="font-semibold text-white">${{ product.price }}</span>
    </div>
    <div class="pt-10 px-4 h-64 bg-white rounded-b-lg leading-relaxed">
      <h4 class="text-lg font-semibold text-gray-700">{{ product.name }}</h4>
      <p class="mt-2 h-40 text-gray-600 text-justify overflow-y-scroll">{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"]
};
</script>
