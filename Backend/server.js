const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const chatHandler = require("./socket/chatHandler");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  chatHandler(io, socket);
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});