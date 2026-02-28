// src/services/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://taptalent-ai-1-a237.onrender.com", {
      transports: ["websocket"],
      autoConnect: true
    });
  }
  return socket;
};