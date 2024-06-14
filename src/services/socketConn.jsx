import { io } from "socket.io-client";
import { useStore } from "./store";

let socket;
const ip = '192.168.6.21';

export const connectWithSocketServer = () => {
  socket = io(`http://${ip}:3001`, {
    transports: ['websocket', 'polling'], // Permite tanto WebSocket como polling
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on('chat-history', (chatHistory) => {
    useStore.setState({ chatHistory }); // Actualizamos el estado directamente
  });

  socket.on('chat-message', (chatMessage) => {
    useStore.setState((state) => {
      return {
        chatHistory: {
          ...state.chatHistory,
          messages: [
            ...state.chatHistory.messages,
            {
              author: chatMessage.author,
              content: chatMessage.content,
              date: chatMessage.date
            }
          ]
        }
      };
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




