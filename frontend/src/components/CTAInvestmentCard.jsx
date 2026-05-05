// ============================================================
// frontend/src/components/CTAInvestmentCard.jsx
// Shown inside the chat when show_cta === true
// Prompts user to buy digital gold or dismiss
// ============================================================

import React from "react";

const GoldBarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="16" width="40" height="20" rx="3" fill="url(#barGold)" />
    <rect x="10" y="20" width="28" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
    <rect x="14" y="26" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
    <path d="M8 16 L16 8 H32 L40 16" fill="url(#barTop)" />
    <defs>
      <linearGradient id="barGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="barTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
  </svg>
);

const CTAInvestmentCard = ({ ctaText, onBuy, onDismiss }) => {
  return (
    <div className="mx-2 my-3 animate-slide-up">
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 shadow-xl shadow-amber-900/10">

        {/* Decorative glow blob */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative p-5">
          {/* Header row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <GoldBarIcon />
            </div>
            <div>
              <p className="text-xs text-amber-400 font-display font-semibold uppercase tracking-widest mb-0.5">
                Investment Opportunity
              </p>
              <h3 className="text-white font-display font-bold text-base leading-snug">
                Ready to invest in gold?
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm font-body leading-relaxed mb-4">
            Start with as little as <span className="text-amber-400 font-semibold">₹100</span>. Digital gold is safe, insured, and 24K pure — stored in your name.
          </p>

          {/* Stats row */}
          <div className="flex gap-3 mb-4">
            {[
              { label: "Purity", value: "24K" },
              { label: "Min. Amount", value: "₹100" },
              { label: "Storage", value: "Insured" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 rounded-xl bg-slate-800/60 border border-slate-700/40 px-3 py-2 text-center"
              >
                <p className="text-amber-400 font-display font-bold text-sm">{stat.value}</p>
                <p className="text-slate-500 text-xs font-body mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5">
            <button
              onClick={onBuy}
              className="flex-1 gold-shimmer text-amber-950 font-display font-bold text-sm py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 shadow-lg shadow-amber-900/30 animate-pulse-gold"
            >
              {ctaText || "Buy Digital Gold"} ✨
            </button>
            <button
              onClick={onDismiss}
              className="px-4 py-3 rounded-xl border border-slate-700/60 text-slate-400 text-sm font-body hover:text-slate-300 hover:border-slate-600 transition-all duration-200"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAInvestmentCard;
