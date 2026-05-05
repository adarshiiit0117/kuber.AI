// ============================================================
// frontend/src/components/ChatWindow.jsx
// Main chat area — renders message list, CTA cards, success cards
// Auto-scrolls to latest message
// ============================================================

import React, { useEffect, useRef } from "react";
import MessageBubble, { TypingBubble } from "./MessageBubble";
import CTAInvestmentCard from "./CTAInvestmentCard";
import SuccessCard from "./SuccessCard";

// Welcome screen shown before first message
const WelcomeScreen = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    {/* Gold orb */}
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-2xl shadow-amber-900/50 animate-pulse-gold">
        <span className="text-3xl">₹</span>
      </div>
      <div className="absolute -inset-2 rounded-full bg-amber-500/10 blur-lg" />
    </div>

    <h1 className="font-display font-bold text-2xl text-white mb-2">
      GoldAI Assistant
    </h1>
    <p className="text-slate-400 font-body text-sm max-w-xs leading-relaxed mb-6">
      Your intelligent guide to digital gold investment. Ask me anything about gold markets, prices, or how to get started.
    </p>

    {/* Suggestion chips */}
    <div className="flex flex-wrap gap-2 justify-center max-w-sm">
      {[
        "📈 Is gold a good investment right now?",
        "💰 How does digital gold work?",
        "🛡️ Is my gold insured?",
        "📊 What's the gold price trend?",
      ].map((q) => (
        <span
          key={q}
          className="text-xs px-3 py-1.5 rounded-full border border-amber-600/25 text-amber-400/70 font-body"
        >
          {q}
        </span>
      ))}
    </div>
  </div>
);

const ChatWindow = ({
  messages,
  isTyping,
  onBuyCTA,
  onDismissCTA,
  successData,
  onSuccessClose,
}) => {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, successData]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4">

      {/* Show welcome screen if no messages yet */}
      {!hasMessages && <WelcomeScreen />}

      {/* Render message list */}
      {messages.map((msg, index) => {
        const isLast = index === messages.length - 1;

        return (
          <React.Fragment key={msg.id || index}>
            {/* Regular message bubble */}
            <MessageBubble message={msg} />

            {/* CTA card — show after last AI message with show_cta flag */}
            {isLast && msg.role === "ai" && msg.showCTA && !successData && (
              <CTAInvestmentCard
                ctaText={msg.ctaText}
                onBuy={onBuyCTA}
                onDismiss={onDismissCTA}
              />
            )}
          </React.Fragment>
        );
      })}

      {/* Typing indicator */}
      {isTyping && <TypingBubble />}

      {/* Success card after purchase */}
      {successData && (
        <SuccessCard data={successData} onClose={onSuccessClose} />
      )}

      {/* Invisible scroll target */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
