// ============================================================
// frontend/src/components/MessageBubble.jsx
// Renders individual chat messages — user (right) or AI (left)
// ============================================================

import React from "react";

// Gold coin SVG icon for AI avatar
const GoldCoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="url(#goldGrad)" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="bold">₹</text>
    <defs>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
  </svg>
);

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  // Format timestamp for display
  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div
      className={`flex items-end gap-2 mb-4 animate-slide-up ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* ── Avatar ── */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
          <GoldCoinIcon />
        </div>
      )}

      {/* ── Bubble ── */}
      <div className={`max-w-[78%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Sender label */}
        <span className="text-xs text-slate-500 mb-1 font-body px-1">
          {isUser ? "You" : "GoldAI"} · {time}
        </span>

        <div
          className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed font-body shadow-lg ${
            isUser
              ? "bg-blue-700 text-white rounded-br-sm"
              : "glass-card text-slate-200 rounded-bl-sm border-slate-700/50"
          }`}
        >
          {/* Message text — preserve newlines */}
          {message.content.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < message.content.split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Typing indicator bubble shown while AI is responding
export const TypingBubble = () => (
  <div className="flex items-end gap-2 mb-4 animate-fade-in">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
      <GoldCoinIcon />
    </div>
    <div className="glass-card px-5 py-4 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
      <span className="typing-dot w-2 h-2 rounded-full bg-amber-400 inline-block" />
      <span className="typing-dot w-2 h-2 rounded-full bg-amber-400 inline-block" />
      <span className="typing-dot w-2 h-2 rounded-full bg-amber-400 inline-block" />
    </div>
  </div>
);

export default MessageBubble;
