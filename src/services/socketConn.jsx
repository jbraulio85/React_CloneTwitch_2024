import { io } from "socket.io-client";
import { useStore } from "./store";

let socket;

export const connectWithSocketServer = () => {
  socket = io('https://node-js-kinal-cast-2024.vercel.app/', {
    transports: ['websocket', 'polling'], // Permite tanto WebSocket como polling
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on('chat-history', (chatHistory) => {
    const { setChatHistory } = useStore().getState();
    setChatHistory(chatHistory);
  });

  socket.on('chat-message', (chatMessage) => {
    const { chatHistory, setChatHistory } = useStore().getState();
    setChatHistory({
      channelId: chatHistory.channelId,
      messages: [
        ...chatHistory.messages,
        {
          author: chatMessage.author,
          content: chatMessage.content,
          date: chatMessage.date
        }
      ]
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected: ${reason}`);
  });

  socket.on("connect_error", (error) => {
    console.log(`Connect error: ${error}`);
  });
};

export const getChatHistory = (channelId) => {
  socket.emit('chat-history', channelId);
};

export const sendChatMessage = (toChannel, message) => {
  socket.emit('chat-message', {
    toChannel,
    message,
  });
};

export const closeChatSubscription = (channelId) => {
  socket.emit("chat-unsubscribe", channelId);
};



