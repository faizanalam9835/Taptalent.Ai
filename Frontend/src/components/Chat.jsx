import { useEffect, useRef, useState } from "react";
import { getSocket } from "../services/socket";
import { FaPaperPlane, FaUserSecret, FaForward } from "react-icons/fa";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socket = getSocket();
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, { from: "partner", text: msg }]);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", text);
    setMessages((prev) => [...prev, { from: "me", text }]);
    setText("");
  };

  const skipChat = () => {
    socket.emit("skip");
    setMessages([]);
  };

  return (
    <div
      style={{
        width: "420px",
        height: "520px",
        margin: "20px auto",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "black",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px"
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaUserSecret />
          Anonymous Chat
        </span>

        <button
          onClick={skipChat}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <FaForward />
          Skip
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "#f7f7f7"
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.from === "me" ? "flex-end" : "flex-start",
              backgroundColor: m.from === "me" ? "#DCF8C6" : "#ffffff",
              padding: "10px 14px",
              borderRadius: "18px",
              maxWidth: "75%",
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              lineHeight: "1.4"
            }}
          >
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "12px",
          borderTop: "1px solid #eee",
          backgroundColor: "#fff",
          borderBottomLeftRadius: "14px",
          borderBottomRightRadius: "14px"
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px"
          }}
        />

        <button
          onClick={sendMessage}
          disabled={!text.trim()}
          style={{
            backgroundColor: text.trim() ? "#667eea" : "#bbb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "20px",
            cursor: text.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <FaPaperPlane />
          Send
        </button>
      </div>
    </div>
  );
}