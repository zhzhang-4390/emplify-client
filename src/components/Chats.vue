<template>
  <div class="py-10 border-b border-gray-600 flex">
    <section
      class="h-124 w-1/4 rounded-lg bg-gray-300 relative overflow-y-auto"
    >
      <div
        v-if="$store.getters.getRooms.length === 0"
        class="absolute inset-0 flex items-center justify-center text-lg text-gray-600"
      >
        You currently don't have any contact
      </div>

      <div
        v-for="(room, index) in $store.getters.getRooms"
        :key="index"
        @click="$store.dispatch('setCurrentRoomIndex', index)"
        class="p-4 bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-default flex items-center"
        :class="{
          'border-t-2': index !== 0,
          'opacity-25': index !== $store.getters.getCurrentRoomIndex,
        }"
      >
        <div
          class="h-10 w-10 rounded-full border border-gray-600 flex items-center justify-center"
        >
          {{ room.name.charAt(0).toUpperCase() }}
        </div>

        <span class="ml-4">{{ room.name }}</span>
      </div>
    </section>

    <section
      class="ml-4 h-124 w-3/4 rounded-lg bg-gray-300 relative overflow-auto"
    >
      <div
        v-if="$store.getters.getCurrentRoomIndex === null"
        class="absolute inset-0 flex items-center justify-center text-lg text-gray-600"
      >
        Select a chat to start messaging
      </div>

      <div
        v-if="$store.getters.getCurrentRoomIndex !== null"
        class="px-8 h-full bg-gray-100 flex flex-col justify-between"
      >
        <div ref="chatbox" class="overflow-y-auto">
          <div
            v-for="(message, index) in $store.getters.getMessages"
            :key="index"
            class="my-4"
          >
            <div
              class="flex"
              :class="{
                'justify-end': message.from === $store.getters.getUser._id,
              }"
            >
              <div
                class="p-4 rounded-lg"
                :class="{
                  'bg-teal-200': message.from !== $store.getters.getUser._id,
                  'bg-gray-300': message.from === $store.getters.getUser._id,
                }"
                style="max-width: 70%"
              >
                <span class="text-sm text-gray-800 break-all">{{
                  message.content
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="py-4 border-t border-gray-400 flex">
          <input
            v-model="input"
            @keyup.enter="sendMessage()"
            type="text"
            placeholder="Message"
            class="w-full bg-gray-100 outline-none text-gray-600"
          />
          <div
            @click="sendMessage()"
            class="px-4 py-2 rounded-lg bg-teal-300 hover:bg-teal-200 transition-colors duration-300 cursor-pointer flex items-center text-gray-600"
          >
            <span>Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="ml-4 h-4 w-4 fill-current"
            >
              <path d="M0 0l20 10L0 20V0zm0 8v4l10-2L0 8z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: null,
    };
  },

  methods: {
    sendMessage() {
      if (this.input) {
        const message = {
          room: this.$store.getters.getRooms[
            this.$store.getters.getCurrentRoomIndex
          ]._id,
          from: this.$store.getters.getUser._id,
          content: this.input,
          time: Date.now(),
          read: true,
        };

        this.$socket.client.emit("message", message);
        this.input = null;
      }
    },

    scrollToBottom() {
      const chatbox = this.$refs.chatbox;
      chatbox.scrollTop = chatbox.scrollHeight;
    },
  },
};
</script>
