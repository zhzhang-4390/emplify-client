<template>
  <div>
    <div
      v-for="(description, role) in options"
      :key="role"
      @click="$emit('input', role)"
      class="mt-4 cursor-pointer flex items-center"
    >
      <div
        class="h-6 w-6 rounded-full border border-gray-400 cursor-pointer flex items-center justify-center"
      >
        <div
          class="h-4 w-4 rounded-full bg-teal-400 transform transition-transform duration-300"
          :class="{
            'scale-0': role !== value,
            'scale-100': role === value
          }"
        ></div>
      </div>

      <span class="ml-4">{{ description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],

  data() {
    return {
      options: {
        buyer: "I'm looking for Team-Building / CSR activites",
        seller: "I'm an activity / venue provider"
      }
    };
  }
};
</script>
