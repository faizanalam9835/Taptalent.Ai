const { addToQueue, matchUsers } = require("../matchmaking/queue");
const chatRepo = require("../db/chatRepository")
const { canSend } = require("../utils/rateLimiter");

module.exports = (io, socket) => {
  console.log("Connected:", socket.id);

  socket.on("findChat", async () => {
    socket.partner = null;
    socket.sessionId = null;
  
    addToQueue(socket);
    await matchUsers();
  });

  socket.on("sendMessage", async (msg) => {
    if (!socket.partner || !canSend(socket.id)) return;

    await chatRepo.saveMessage(socket.sessionId, socket.id, msg);

    io.to(socket.partner).emit("receiveMessage", msg);
  });

  socket.on("skip", async () => {
    if (socket.partner) {
      io.to(socket.partner).emit("partnerDisconnected");
      await chatRepo.endSession(socket.sessionId);
    }
  
    socket.partner = null;
    socket.sessionId = null;
  
    addToQueue(socket);
    await matchUsers();
  });

  socket.on("disconnect", async () => {
    if (socket.partner) {
      io.to(socket.partner).emit("partnerDisconnected");
      await chatRepo.endSession(socket.sessionId);
    }
  });
};