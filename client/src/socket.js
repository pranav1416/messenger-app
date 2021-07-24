import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateConversations
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", async (data) => {
    await store.dispatch(setNewMessage(data.message, data.sender));
    store.dispatch(updateConversations());
  });

  socket.on("read-message", (data) => {
    store.dispatch(setReadMessages(data.conversationId, data.messageIds));
  });
});

export default socket;
