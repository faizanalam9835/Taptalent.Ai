const limit = 5;
const interval = 5000;
const userMap = {};

const canSend = (id) => {
  const now = Date.now();
  userMap[id] = (userMap[id] || []).filter(t => now - t < interval);

  if (userMap[id].length >= limit) return false;

  userMap[id].push(now);
  return true;
};

module.exports = { canSend };