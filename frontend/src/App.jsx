// ============================================================
// frontend/src/App.jsx
// Root component — wires together chat, purchase, and sidebar
// ============================================================

import React, { useState, useCallback } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import PurchaseModal from "./components/PurchaseModal";
import TransactionSidebar from "./components/TransactionSidebar";
import { sendChatMessage } from "./services/api";

// Fixed user ID for this demo app (would come from auth in production)
const USER_ID = "adarsh123";

// Generate a stable session ID for conversational memory
const SESSION_ID = `session_${Date.now()}`;

const App = () => {
  // ── Chat state ──
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // ── Purchase / CTA state ──
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // ── Sidebar toggle (mobile) ──
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ─────────────────────────────────────────────────────────
  // Send a user message and fetch AI response
  // ─────────────────────────────────────────────────────────
  const handleSend = useCallback(async (text) => {
    // Append user message immediately
    const userMsg = {
      id: `user_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setSuccessData(null); // Clear any previous success card

    try {
      // Hit the backend chat API
      const data = await sendChatMessage(text, SESSION_ID);

      // Build the AI message object
      const aiMsg = {
        id: `ai_${Date.now()}`,
        role: "ai",
        content: data.response,
        timestamp: new Date().toISOString(),
        showCTA: data.show_cta,
        ctaText: data.cta_text,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Show a graceful error message in the chat
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "ai",
          content: "Sorry, I'm having trouble connecting right now. Please check if the backend is running on port 8000.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  // ─────────────────────────────────────────────────────────
  // CTA card handlers — open or dismiss the purchase prompt
  // ─────────────────────────────────────────────────────────
  const handleBuyCTA = () => {
    setIsPurchaseOpen(true);
  };

  const handleDismissCTA = () => {
    // Remove the showCTA flag from the last AI message
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === prev.length - 1 ? { ...msg, showCTA: false } : msg
      )
    );
  };

  // ─────────────────────────────────────────────────────────
  // Handle successful gold purchase
  // ─────────────────────────────────────────────────────────
  const handlePurchaseSuccess = (data) => {
    setSuccessData(data);
    // Trigger sidebar refresh to show the new transaction
    setRefreshTrigger((prev) => prev + 1);
    // Remove the CTA from the last AI message
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === prev.length - 1 ? { ...msg, showCTA: false } : msg
      )
    );
  };

  const handleSuccessClose = () => {
    setSuccessData(null);
  };

  return (
    <div className="bg-mesh min-h-screen flex flex-col font-body">

      {/* ── Top Navigation Bar ── */}
      <header className="flex-shrink-0 glass-card border-b border-slate-800/60 px-4 md:px-6 h-14 flex items-center justify-between z-10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30">
            <span className="text-amber-950 font-display font-black text-sm">₹</span>
          </div>
          <div>
            <span className="font-display font-bold text-white text-base leading-none">GoldAI</span>
            <p className="text-xs text-slate-500 font-body leading-none mt-0.5">by SimplifyMoney</p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Live indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-700/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-body">AI Live</span>
          </div>

          {/* Buy button shortcut */}
          <button
            onClick={() => setIsPurchaseOpen(true)}
            className="gold-shimmer text-amber-950 font-display font-bold text-xs px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-transform duration-150 shadow-md shadow-amber-900/20"
          >
            Buy Gold
          </button>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden w-9 h-9 rounded-lg border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ── Chat Panel ── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onBuyCTA={handleBuyCTA}
            onDismissCTA={handleDismissCTA}
            successData={successData}
            onSuccessClose={handleSuccessClose}
          />
          <ChatInput onSend={handleSend} isLoading={isTyping} />
        </main>

        {/* ── Desktop Transaction Sidebar ── */}
        <div className="hidden md:flex">
          <TransactionSidebar userId={USER_ID} refreshTrigger={refreshTrigger} />
        </div>

        {/* ── Mobile Sidebar Overlay ── */}
        {sidebarOpen && (
          <div className="md:hidden absolute inset-0 z-40 flex">
            {/* Backdrop */}
            <div
              className="flex-1 modal-backdrop"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar panel */}
            <div className="w-72 h-full flex">
              <TransactionSidebar userId={USER_ID} refreshTrigger={refreshTrigger} />
            </div>
          </div>
        )}
      </div>

      {/* ── Purchase Modal ── */}
      <PurchaseModal
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
        onSuccess={handlePurchaseSuccess}
        userId={USER_ID}
      />
    </div>
  );
};

export default App;
