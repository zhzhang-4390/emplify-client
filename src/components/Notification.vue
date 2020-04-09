<template>
  <div class="w-full flex justify-center">
    <div class="mb-12 p-4 bg-gray-900 rounded-lg">
      <span
        class="font-semibold"
        :class="{
          'text-teal-400': $store.getters.getIfGoodNews,
          'text-red-500': !$store.getters.getIfGoodNews,
        }"
        >{{ $store.getters.getMessage }}</span
      >
      <span
        @click="$store.dispatch('dismissNotification')"
        class="ml-8 py-1 px-2 rounded-lg font-semibold text-red-500 hover:bg-gray-800 cursor-pointer transition-colors duration-300"
        >Dismiss</span
      >
    </div>
  </div>
</template>
