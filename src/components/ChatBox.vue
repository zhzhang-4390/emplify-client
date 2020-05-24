<template>
  <div ref="chatBox" class="overflow-y-auto" style="scroll-behavior: smooth">
    <div
      v-for="(message, index) in $store.getters.getCurrentMessages"
      :key="index"
      class="my-8"
    >
      <div
        class="flex items-end"
        :class="{
          'flex-row-reverse': message.from === $store.getters.getUser._id,
        }"
      >
        <div
          class="py-3 px-4 rounded-lg"
          :class="{
            'bg-teal-200': message.from === $store.getters.getUser._id,
            'bg-gray-300': message.from !== $store.getters.getUser._id,
          }"
          style="max-width: 70%"
        >
          <span class="text-sm text-gray-800 break-all">{{
            message.content
          }}</span>
        </div>

        <span
          class="text-xs text-gray-600 tracking-wider"
          :class="{
            'mr-4': message.from === $store.getters.getUser._id,
            'ml-4': message.from !== $store.getters.getUser._id,
          }"
          >{{ new Date(message.updatedAt).toLocaleString() }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.scrollToBottom();
  },

  updated() {
    this.scrollToBottom();
  },

  methods: {
    scrollToBottom() {
      const chatBox = this.$refs.chatBox;
      chatBox.scrollTop = chatBox.scrollHeight;
    },
  },
};
</script>
