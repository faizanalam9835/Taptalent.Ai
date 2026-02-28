// src/services/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:4000", {
      transports: ["websocket"],
      autoConnect: true
    });
  }
  return socket;
};