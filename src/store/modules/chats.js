export default {
  state: {
    rooms: [],
    currentRoomIndex: null,
    messages: [],
  },

  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },

    addRoom(state, room) {
      state.rooms.unshift(room);
    },

    setCurrentRoomIndex(state, currentRoomIndex) {
      state.currentRoomIndex = currentRoomIndex;
      if (state.currentRoomIndex === null) {
        state.messages = [];
      } else {
        state.messages = state.rooms[state.currentRoomIndex].messages;
      }
    },

    addMessage(state, message) {
      const matchedRoom = state.rooms.find((room) => room._id === message.room);
      if (matchedRoom) {
        matchedRoom.messages.push(message);
      }
    },
  },

  actions: {
    socket_connect(context) {
      this._vm.$socket.client.emit("signin", {
        user: context.getters.getUser._id,
      });
      context.commit("setCurrentRoomIndex", null);
    },

    socket_load(context, rooms) {
      context.commit("setRooms", rooms);
    },

    socket_contact(context, room) {
      context.commit("addRoom", room);
      if (room.users[0] === context.getters.getUser._id) {
        context.commit("setCurrentRoomIndex", 0);
      }
      this._vm.$socket.client.emit("join", {
        _id: room._id,
      });
    },

    socket_message(context, message) {
      context.commit("addMessage", message);
    },

    setCurrentRoomIndex(context, currentRoomIndex) {
      context.commit("setCurrentRoomIndex", currentRoomIndex);
    },
  },

  getters: {
    getRooms(state) {
      return state.rooms;
    },

    getCurrentRoomIndex(state) {
      return state.currentRoomIndex;
    },

    getMessages(state) {
      return state.messages;
    },
  },
};
