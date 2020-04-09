<template>
  <div class="p-4 bg-gray-200 rounded-t-lg flex justify-end">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      @mouseover="showCloseButton = true"
      @mouseleave="showCloseButton = false"
      @click="$emit('close')"
      class="h-6 w-6 rounded-full bg-gray-400 fill-current text-gray-800"
      style="padding: 0.375rem"
    >
      <path
        d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
        class="opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': showCloseButton }"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCloseButton: false,
    };
  },
};
</script>
