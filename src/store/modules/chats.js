export default {
  state: {
    rooms: [],
    unreadMessageCount: 0,
    currentRoomIndex: null,
    currentMessages: [],
  },

  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },

    addRoom(state, room) {
      state.rooms.push(room);
    },

    updateUnreadMessageCount(state) {
      let unreadMessageCount = 0;
      for (const room of state.rooms) {
        unreadMessageCount += room.messages.length - room.pointer - 1;
      }
      state.unreadMessageCount = unreadMessageCount;
    },

    addMessage(state, message) {
      state.rooms
        .find((room) => room._id === message.room)
        .messages.push(message);
    },

    setCurrentRoomIndex(state, currentRoomIndex) {
      state.currentRoomIndex = currentRoomIndex;
    },

    setCurrentMessages(state, currentMessages) {
      state.currentMessages = currentMessages;
    },

    updateRoomPointer(state) {
      const currentRoom = state.rooms[state.currentRoomIndex];
      currentRoom.pointer = currentRoom.messages.length - 1;
    },
  },

  actions: {
    socket_connect(context) {
      this._vm.$socket.client.emit("signin", {
        user: context.getters.getUser._id,
      });
    },

    socket_load(context, rooms) {
      context.commit("setRooms", rooms);
      context.commit("updateUnreadMessageCount");
    },

    socket_contact(context, room) {
      context.commit("addRoom", room);
      if (context.getters.getCurrentRoomIndex === -1) {
        context.dispatch(
          "setCurrentRoomIndex",
          context.getters.getRooms.length - 1
        );
      }
      this._vm.$socket.client.emit("join", {
        _id: room._id,
      });
    },

    socket_message(context, message) {
      context.commit("addMessage", message);
      const currentRoomIndex = context.getters.getCurrentRoomIndex;
      const currentRoom = context.getters.getRooms[currentRoomIndex];
      if (
        currentRoomIndex !== null &&
        currentRoomIndex !== -1 &&
        currentRoom._id === message.room
      ) {
        context.commit("updateRoomPointer");
        this._vm.$socket.client.emit("read", {
          room: currentRoom._id,
          user: context.getters.getUser._id,
          pointer: currentRoom.pointer,
        });
      } else {
        context.commit("updateUnreadMessageCount");
      }
    },

    setCurrentRoomIndex(context, currentRoomIndex) {
      context.commit("setCurrentRoomIndex", currentRoomIndex);
      if (currentRoomIndex !== null && currentRoomIndex !== -1) {
        const currentRoom = context.getters.getRooms[currentRoomIndex];
        context.commit("setCurrentMessages", currentRoom.messages);
        context.commit("updateRoomPointer");
        context.commit("updateUnreadMessageCount");
        this._vm.$socket.client.emit("read", {
          room: currentRoom._id,
          user: context.getters.getUser._id,
          pointer: currentRoom.pointer,
        });
      } else {
        context.commit("setCurrentMessages", []);
      }
    },

    initChat(context, counterpart) {
      const indexOfCounterpart = context.getters.getRooms.findIndex(
        (room) => room.counterpart === counterpart
      );
      context.dispatch("setCurrentRoomIndex", indexOfCounterpart);
      if (indexOfCounterpart === -1) {
        this._vm.$socket.client.emit("contact", {
          from: context.getters.getUser._id,
          to: counterpart,
        });
      }
    },
  },

  getters: {
    getRooms(state) {
      return state.rooms;
    },

    getUnreadMessageCount(state) {
      return state.unreadMessageCount;
    },

    getCurrentRoomIndex(state) {
      return state.currentRoomIndex;
    },

    getCurrentMessages(state) {
      return state.currentMessages;
    },
  },
};
