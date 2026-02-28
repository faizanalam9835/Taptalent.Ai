// matchmaking/queue.js
const { v4: uuidv4 } = require("uuid");
const chatRepo = require("../db/chatRepository");

const waitingUsers = [];

const addToQueue = (socket) => {
  // already matched user ko queue me mat daalo
  if (socket.partner) return;

  // duplicate prevent
  if (!waitingUsers.find(s => s.id === socket.id)) {
    waitingUsers.push(socket);
  }
};

const matchUsers = async () => {
  if (waitingUsers.length < 2) return;

  const user1 = waitingUsers.shift();
  const user2 = waitingUsers.shift();

  // SAFETY CHECK
  if (!user1 || !user2) return;

  const sessionId = uuidv4();

  user1.partner = user2.id;
  user2.partner = user1.id;

  user1.sessionId = sessionId;
  user2.sessionId = sessionId;

  await chatRepo.createSession(sessionId, user1.id, user2.id);

  // 🔥 IMPORTANT: emit to BOTH users explicitly
  user1.emit("matched", { partner: user2.id });
  user2.emit("matched", { partner: user1.id });
};

module.exports = { addToQueue, matchUsers };