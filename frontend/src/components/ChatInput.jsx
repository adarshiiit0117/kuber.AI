// ============================================================
// frontend/src/components/ChatInput.jsx
// Message input bar with send button and keyboard shortcut
// ============================================================

import React, { useState, useRef } from "react";

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChatInput = ({ onSend, isLoading }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  const handleChange = (e) => {
    setText(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  };

  // Send message on Enter (Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Dispatch message to parent and reset input
  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  // Quick prompt suggestions
  const suggestions = [
    "Is gold a safe investment?",
    "How does digital gold work?",
    "Show me gold rates today",
  ];

  return (
    <div className="border-t border-slate-800/60 bg-navy-900/80 backdrop-blur-md p-3 md:p-4">
      {/* ── Quick suggestion pills ── */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => { onSend(s); }}
            disabled={isLoading}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-amber-600/30 text-amber-400/80 hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/5 transition-all duration-200 font-body whitespace-nowrap"
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Input row ── */}
      <div className="flex items-end gap-3">
        <div className="flex-1 glass-card rounded-2xl px-4 py-3 flex items-end gap-2 focus-within:border-amber-500/30 transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about gold investment..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent resize-none text-sm text-slate-200 placeholder-slate-500 outline-none font-body leading-relaxed max-h-28 disabled:opacity-50"
          />
          <span className="text-xs text-slate-600 mb-0.5 hidden md:block">⏎ send</span>
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isLoading || !text.trim()}
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed gold-shimmer hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30"
        >
          <span className="text-amber-950">
            <SendIcon />
          </span>
        </button>
      </div>

      <p className="text-center text-xs text-slate-600 mt-2 font-body">
        Powered by Groq LLM · RAG-enhanced · Conversational memory
      </p>
    </div>
  );
};

export default ChatInput;
