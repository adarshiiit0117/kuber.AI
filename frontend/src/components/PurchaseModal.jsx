// ============================================================
// frontend/src/components/PurchaseModal.jsx
// Modal for entering gold purchase amount and confirming buy
// ============================================================

import React, { useState } from "react";
import { purchaseGold } from "../services/api";

// Predefined quick-select amount options
const QUICK_AMOUNTS = [100, 500, 1000, 2500, 5000];

// Current gold rate (display only — backend calculates actual grams)
const DISPLAY_GOLD_RATE = 15150; // ₹ per gram (approx)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
  </svg>
);

const PurchaseModal = ({ isOpen, onClose, onSuccess, userId }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // Estimate how many grams the entered amount buys (approximate)
  const estimatedGrams =
    amount && Number(amount) > 0
      ? (Number(amount) / DISPLAY_GOLD_RATE).toFixed(6)
      : "0.000000";

  // Handle amount input — only allow positive numbers
  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setAmount(val);
    setError("");
  };

  // Call the purchase API
  const handleBuy = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount < 10) {
      setError("Minimum investment is ₹10");
      return;
    }
    if (numAmount > 500000) {
      setError("Maximum investment per transaction is ₹5,00,000");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Call backend purchase endpoint
      const data = await purchaseGold(userId, numAmount);
      onSuccess(data); // Lift result up to App
      setAmount("");
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        "Purchase failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl glass-card border border-slate-700/50 shadow-2xl animate-slide-up overflow-hidden">

        {/* ── Header ── */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-800/60">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-400 font-display font-semibold uppercase tracking-widest mb-0.5">
                Digital Gold
              </p>
              <h2 className="text-white font-display font-bold text-xl">
                Buy Gold
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all"
            >
              <XIcon />
            </button>
          </div>

          {/* Live rate display */}
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-body">
              Live rate: <span className="text-amber-400 font-semibold">₹{DISPLAY_GOLD_RATE.toLocaleString("en-IN")}/g</span>
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5">

          {/* Amount input */}
          <div className="mb-4">
            <label className="block text-xs text-slate-400 font-body mb-2 uppercase tracking-wider">
              Enter Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 font-display font-bold text-xl">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-10 pr-4 py-4 text-white font-display font-bold text-2xl placeholder-slate-600 outline-none focus:border-amber-500/50 focus:bg-slate-800 transition-all duration-200"
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-xs font-body mt-2 flex items-center gap-1">
                <span>⚠</span> {error}
              </p>
            )}
          </div>

          {/* Quick amount buttons */}
          <div className="grid grid-cols-5 gap-2 mb-5">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => { setAmount(String(amt)); setError(""); }}
                className={`py-2 rounded-lg text-xs font-display font-semibold border transition-all duration-200 ${
                  Number(amount) === amt
                    ? "border-amber-500/60 bg-amber-500/15 text-amber-400"
                    : "border-slate-700/50 text-slate-400 hover:border-amber-500/30 hover:text-amber-400/80"
                }`}
              >
                ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
              </button>
            ))}
          </div>

          {/* Estimated grams preview */}
          <div className="rounded-xl bg-slate-800/50 border border-amber-500/15 px-4 py-3 mb-5 flex items-center justify-between">
            <span className="text-sm text-slate-400 font-body">You will receive</span>
            <span className="text-amber-400 font-display font-bold text-base">
              {estimatedGrams}g gold
            </span>
          </div>

          {/* Confirm buy button */}
          <button
            onClick={handleBuy}
            disabled={isLoading || !amount}
            className="w-full py-4 rounded-xl font-display font-bold text-base text-amber-950 gold-shimmer hover:scale-[1.01] active:scale-[0.99] transition-transform duration-150 shadow-lg shadow-amber-900/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Processing...</span>
              </>
            ) : (
              `Confirm · ₹${Number(amount || 0).toLocaleString("en-IN")}`
            )}
          </button>

          <p className="text-center text-xs text-slate-600 font-body mt-3">
            🔒 Secured & insured · 24K pure gold · Instant delivery
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
