import React from "react";
import "./ChatBuddy.css";

// The component now accepts an 'onClose' function as a prop
function ChatBuddy({ onClose }) {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-avatar">🤖</div>
        <div className="chat-info">
          <h4>Your Health Assistant</h4>
          <span>Online</span>
        </div>
        {/* --- DELETE THIS BUTTON ELEMENT --- */}
        {/* <button onClick={onClose} className="chat-header-close-btn">&times;</button> */}
      </div>
      <div className="chat-body">
        <p className="chat-message">
          Welcome! I'm here to help. For reliable answers to common questions,
          please visit the National Breast Cancer Foundation's FAQ page.
        </p>
      </div>
      <div className="chat-footer">
        <a
          href="https://www.nationalbreastcancer.org/breast-cancer-faqs/"
          target="_blank"
          rel="noopener noreferrer"
          className="faq-button"
        >
          Visit FAQ Page
        </a>
      </div>
    </div>
  );
}

export default ChatBuddy;
