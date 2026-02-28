const pool = require("./db");

const createSession = async (id, u1, u2) => {
  await pool.query(
    "INSERT INTO chat_sessions(id, user1_socket, user2_socket) VALUES($1,$2,$3)",
    [id, u1, u2]
  );
};

const saveMessage = async (sessionId, sender, message) => {
  await pool.query(
    "INSERT INTO chat_messages(session_id, sender_socket, message) VALUES($1,$2,$3)",
    [sessionId, sender, message]
  );
};

const endSession = async (sessionId) => {
  await pool.query(
    "UPDATE chat_sessions SET ended_at = NOW() WHERE id=$1",
    [sessionId]
  );
};

module.exports = { createSession, saveMessage, endSession };