<template>
  <div class="flex">
    <div v-for="m in Math.round(rating)" :key="'teal' + m">
      <svg
        class="h-4 w-4 fill-current text-teal-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </div>
    <div v-for="n in 5 - Math.round(rating)" :key="'gray' + n">
      <svg
        class="h-4 w-4 fill-current text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rating"],
};
</script>
