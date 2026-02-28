# Anonymous Real-Time Chat Application (Full Stack)

A full-stack anonymous real-time chat application inspired by Omegle.
Users are randomly matched and can chat instantly without login or signup.

This project demonstrates real-time communication, matchmaking logic,
WebSocket handling, frontend–backend integration, and deployment readiness.


====================================================
FEATURES
====================================================

- Random 1-to-1 anonymous chat
- Real-time messaging using Socket.IO
- Skip current chat and find new partner
- Partner disconnect handling (no popup alerts)
- Clean light UI with inline CSS
- Single socket connection (no duplicates)
- PostgreSQL database support


====================================================
TECH STACK
====================================================

Frontend:
- React (Vite)
- Socket.IO Client
- React Icons
- Inline CSS

Backend:
- Node.js
- Express
- Socket.IO
- PostgreSQL
- dotenv


====================================================
SYSTEM ARCHITECTURE
====================================================

React Frontend
   |
   |  WebSocket (Socket.IO)
   |
Node.js + Express Server
   |
   |  Matchmaking Queue
   |
PostgreSQL Database


====================================================
FOLDER STRUCTURE
====================================================

Backend/
│
├── server.js
├── package.json
├── .env
│
├── socket/
│   └── chatHandler.js
│
├── matchmaking/
│   └── queue.js
│
├── db/
│   ├── db.js
│   └── chatRepository.js


Frontend/
│
├── src/
│   ├── components/
│   │   └── Chat.jsx
│   │
│   ├── services/
│   │   └── socket.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│
├── package.json
├── vite.config.js


====================================================
DATABASE SETUP
====================================================

Database Name:
anonymous_chat


SQL Schema:

CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  user1 TEXT,
  user2 TEXT,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP
);

CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  session_id UUID,
  sender TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);


====================================================
ENVIRONMENT VARIABLES
====================================================

Backend (.env):

DB_HOST=localhost
DB_PORT=5432
DB_NAME=anonymous_chat
DB_USER=postgres
DB_PASSWORD=your_password
PORT=4000


Frontend (.env):

VITE_SOCKET_URL=http://localhost:4000


====================================================
LOCAL SETUP
====================================================

1. Clone the repository

git clone <repository-url>


2. Backend setup

cd Backend
npm install
node server.js

Backend will run on:
http://localhost:4000


3. Frontend setup

cd Frontend
npm install
npm run dev

Frontend will run on:
http://localhost:5173


====================================================
HOW MATCHMAKING WORKS
====================================================

1. User clicks "Start Chat"
2. User is added to matchmaking queue
3. If another user is waiting:
   - Both users are matched
   - "matched" event is emitted
4. Messages are exchanged via socket IDs
5. On "Skip":
   - Current session ends
   - User goes back to queue
6. On disconnect:
   - Partner is notified
   - UI resets to idle state


====================================================
COMMON ISSUES & FIXES
====================================================

Problem: psql command not found
Fix: Use pgAdmin instead of CLI

Problem: relation does not exist
Fix: Run SQL schema manually in pgAdmin

Problem: Searching forever
Fix: Only one user online, open app in two browsers

Problem: Multiple socket connections
Fix: Use singleton socket instance


====================================================
DEPLOYMENT GUIDE
====================================================

Backend (Render):

1. Create a Web Service
2. Select Node.js environment
3. Add environment variables
4. Attach PostgreSQL database
5. Start command:
   node server.js


Frontend (Vercel):

1. Import GitHub repository
2. Add environment variable:
   VITE_SOCKET_URL=https://your-backend-url
3. Deploy


====================================================
FUTURE IMPROVEMENTS
====================================================

- Typing indicator
- Online users count
- Dark mode
- Redis-based matchmaking
- Message moderation
- Mobile-first UI
- Audio / video chat


====================================================
AUTHOR
====================================================

Faizan Alam
Full-Stack Developer
(JavaScript | React | Node.js | PostgreSQL)
