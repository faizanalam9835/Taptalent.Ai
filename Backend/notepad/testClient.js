const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Client connected:", socket.id);
  socket.emit("findChat");
});