import { useEffect, useState } from "react";
import { getSocket } from "./services/socket";
import Chat from "./components/Chat";
import { FaComments, FaSearch, FaInfoCircle } from "react-icons/fa";

function App() {
  const [status, setStatus] = useState("idle");
  const [infoMessage, setInfoMessage] = useState("");
  const socket = getSocket();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Frontend connected:", socket.id);
    });

    socket.on("matched", () => {
      setInfoMessage("");
      setStatus("connected");
    });

    socket.on("partnerDisconnected", () => {
      setStatus("idle");
      setInfoMessage("Your partner disconnected. You can start a new chat.");
    });

    return () => {
      socket.off("connect");
      socket.off("matched");
      socket.off("partnerDisconnected");
    };
  }, [socket]);

  const startChat = () => {
    setInfoMessage("");
    setStatus("searching");
    socket.emit("findChat");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "460px",
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          padding: "32px",
          textAlign: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
        }}
      >
        {/* Title */}
        <h2
          style={{
            marginBottom: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            color: "#4f46e5"
          }}
        >
          <FaComments />
          Anonymous Chat
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "20px",
            fontSize: "14px"
          }}
        >
          Talk to random people anonymously
        </p>

        {/* INFO MESSAGE (CENTER, NO POPUP) */}
        {infoMessage && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              backgroundColor: "#fef3c7",
              color: "#92400e",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
              border: "1px solid #fde68a"
            }}
          >
            <FaInfoCircle />
            {infoMessage}
          </div>
        )}

        {/* Idle */}
        {status === "idle" && (
          <button
            onClick={startChat}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              backgroundColor: "#e0e7ff",
              color: "#3730a3",
              border: "1px solid #c7d2fe",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: 600
            }}
          >
            <FaComments />
            Start Chat
          </button>
        )}

        {/* Searching */}
        {status === "searching" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginTop: "24px"
            }}
          >
            <FaSearch size={26} color="#6366f1" />
            <p style={{ fontWeight: 600, color: "#374151" }}>
              Searching for partner…
            </p>
          </div>
        )}

        {/* Chat */}
        {status === "connected" && <Chat />}
      </div>
    </div>
  );
}

export default App;