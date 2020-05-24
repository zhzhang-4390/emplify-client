<template>
  <div class="py-10 border-b border-gray-600 flex">
    <section
      class="w-1/4 rounded-lg bg-gray-300 relative overflow-y-auto"
      style="height: 36rem"
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
          'opacity-50': index !== $store.getters.getCurrentRoomIndex,
        }"
      >
        <div
          class="flex-shrink-0 h-10 w-10 rounded-full border border-gray-600 flex items-center justify-center"
        >
          {{ room.name.charAt(0).toUpperCase() }}
        </div>

        <div class="w-full overflow-x-hidden">
          <div class="ml-4 text-sm flex justify-between">
            <span class="font-semibold whitespace-no-wrap overflow-x-hidden">{{
              room.name
            }}</span>
            <span
              v-if="room.messages.length !== 0"
              class="ml-2 text-gray-600 tracking-wider whitespace-no-wrap"
              >{{
                convertDateFormat(
                  room.messages[room.messages.length - 1].updatedAt
                )
              }}</span
            >
          </div>
          <div class="mt-1 ml-4 flex justify-between">
            <span
              class="text-sm text-gray-600 whitespace-no-wrap overflow-x-hidden"
            >
              {{
                room.messages.length === 0
                  ? room.name
                  : room.messages[room.messages.length - 1].content
              }}
            </span>
            <div
              v-if="countUnreadMessages(room) !== 0"
              class="flex-shrink-0 ml-2 h-5 w-5 rounded-full bg-teal-300 flex items-center justify-center text-xs text-white"
            >
              {{ countUnreadMessages(room) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="ml-4 w-3/4 rounded-lg bg-gray-300 relative overflow-auto"
      style="height: 36rem"
    >
      <div
        v-if="!validCurrentRoomIndex()"
        class="absolute inset-0 flex items-center justify-center text-lg text-gray-600"
      >
        Select a chat to start messaging
      </div>

      <div
        v-if="validCurrentRoomIndex()"
        class="px-8 h-full bg-gray-100 flex flex-col justify-between"
      >
        <ChatBox />

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
            class="px-4 py-2 rounded-lg bg-teal-200 hover:bg-teal-200 transition-colors duration-300 cursor-pointer flex items-center text-gray-800"
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
import ChatBox from "./ChatBox.vue";

export default {
  components: {
    ChatBox,
  },

  data() {
    return {
      input: null,
    };
  },

  destroyed() {
    this.$store.dispatch("setCurrentRoomIndex", null);
  },

  methods: {
    convertDateFormat(date) {
      if (new Date(date).getDate() === new Date().getDate()) {
        return new Date(date).toLocaleTimeString();
      } else {
        return new Date(date).toLocaleDateString();
      }
    },

    countUnreadMessages(room) {
      return room.messages.length - room.pointer - 1;
    },

    validCurrentRoomIndex() {
      const currentRoomIndex = this.$store.getters.getCurrentRoomIndex;
      return currentRoomIndex !== null && currentRoomIndex !== -1;
    },

    sendMessage() {
      if (this.input) {
        const message = {
          room: this.$store.getters.getRooms[
            this.$store.getters.getCurrentRoomIndex
          ]._id,
          from: this.$store.getters.getUser._id,
          type: "text",
          content: this.input,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        this.$socket.client.emit("message", message);
        this.input = null;
      }
    },
  },
};
</script>
