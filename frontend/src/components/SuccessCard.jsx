// ============================================================
// frontend/src/components/SuccessCard.jsx
// Displays transaction success details after gold purchase
// ============================================================

import React from "react";

const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="url(#successGrad)" />
    <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="successGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const SuccessCard = ({ data, onClose }) => {
  if (!data) return null;

  // Format the gold grams to 6 decimal places for display
  const goldGrams = typeof data.gold_grams === "number"
    ? data.gold_grams.toFixed(6)
    : data.gold_grams;

  return (
    <div className="mx-2 my-3 animate-slide-up">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 shadow-xl shadow-emerald-900/10">

        {/* Decorative glow */}
        <div className="absolute -top-6 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative p-5">
          {/* Success header */}
          <div className="flex items-center gap-3 mb-4">
            <CheckCircleIcon />
            <div>
              <p className="text-xs text-emerald-400 font-display font-semibold uppercase tracking-widest mb-0.5">
                Purchase Confirmed
              </p>
              <h3 className="text-white font-display font-bold text-base">
                Gold added to your wallet! 🥇
              </h3>
            </div>
          </div>

          {/* Transaction details grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-slate-800/60 border border-slate-700/40 p-3">
              <p className="text-xs text-slate-500 font-body mb-1">Amount Invested</p>
              <p className="text-amber-400 font-display font-bold text-lg">
                ₹{data.amount_paid?.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/60 border border-slate-700/40 p-3">
              <p className="text-xs text-slate-500 font-body mb-1">Gold Purchased</p>
              <p className="text-amber-400 font-display font-bold text-lg">
                {goldGrams}g
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="rounded-xl bg-emerald-900/20 border border-emerald-700/25 px-4 py-3 mb-4 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-body">Transaction ID</span>
            <span className="text-xs text-emerald-400 font-mono font-medium tracking-wider">
              #{data.transaction_id}
            </span>
          </div>

          {/* Message */}
          <p className="text-slate-400 text-sm font-body mb-4 leading-relaxed text-center">
            {data.message || "Your digital gold is safely stored and insured."}
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-700/60 text-slate-300 text-sm font-body hover:bg-slate-800/50 hover:text-white transition-all duration-200"
          >
            Continue Chatting
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
