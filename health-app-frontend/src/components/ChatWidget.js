import React, { useState } from "react";
import ChatBuddy from "./ChatBuddy";
import "./ChatWidget.css"; // We'll create this file next

function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="chat-widget-container">
      {/* The chat window only appears if isChatOpen is true */}
      {isChatOpen && (
        <div className="chat-window">
          <ChatBuddy onClose={() => setIsChatOpen(false)} />
        </div>
      )}

      {/* The icon button now toggles the chat window */}
      <button
        className="chat-icon-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? "✕" : "🤖"}
      </button>
    </div>
  );
}

export default ChatWidget;
