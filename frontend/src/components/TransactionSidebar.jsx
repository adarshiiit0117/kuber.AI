// ============================================================
// frontend/src/components/TransactionSidebar.jsx
// Sidebar displaying the user's gold transaction history
// ============================================================

import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.5 15a9 9 0 1 1-2.5-7.6L23 10" />
  </svg>
);

const EmptyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="mx-auto mb-3 opacity-30">
    <circle cx="24" cy="24" r="20" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 3" />
    <text x="24" y="30" textAnchor="middle" fontSize="18" fill="#fbbf24">₹</text>
  </svg>
);

const TransactionSidebar = ({ userId, refreshTrigger }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getTransactions(userId);
      // Sort by most recent first (they come in insertion order)
      setTransactions((data.transactions || []).reverse());
    } catch (err) {
      setError("Could not load transactions.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and when a new purchase completes
  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [userId, refreshTrigger]);

  // Calculate totals for summary row
  const totalInvested = transactions.reduce((sum, t) => sum + (t.amount_paid || 0), 0);
  const totalGrams = transactions.reduce((sum, t) => sum + (t.gold_grams || 0), 0);

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col glass-card border-l border-slate-800/60 overflow-hidden">

      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-800/60">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display font-bold text-white text-base">My Portfolio</h2>
          <button
            onClick={fetchTransactions}
            disabled={isLoading}
            title="Refresh"
            className="text-slate-500 hover:text-amber-400 transition-colors disabled:opacity-40"
          >
            <RefreshIcon />
          </button>
        </div>
        <p className="text-xs text-slate-500 font-body">Transaction history · {userId}</p>
      </div>

      {/* ── Summary cards ── */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-2 gap-2 px-4 py-3 border-b border-slate-800/60">
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/30 px-3 py-2.5">
            <p className="text-xs text-slate-500 font-body mb-0.5">Total Invested</p>
            <p className="text-amber-400 font-display font-bold text-sm">
              ₹{totalInvested.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/30 px-3 py-2.5">
            <p className="text-xs text-slate-500 font-body mb-0.5">Total Gold</p>
            <p className="text-amber-400 font-display font-bold text-sm">
              {totalGrams.toFixed(4)}g
            </p>
          </div>
        </div>
      )}

      {/* ── Transaction list ── */}
      <div className="flex-1 overflow-y-auto sidebar-scroll px-4 py-3 space-y-2.5">

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-2.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-slate-800/40 border border-slate-700/30 p-3 animate-pulse">
                <div className="h-3 bg-slate-700 rounded w-1/2 mb-2" />
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-1.5" />
                <div className="h-2.5 bg-slate-700/60 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="text-center py-8">
            <p className="text-red-400/70 text-sm font-body">{error}</p>
            <button onClick={fetchTransactions} className="text-amber-400 text-xs mt-2 hover:underline font-body">
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && transactions.length === 0 && (
          <div className="text-center py-10">
            <EmptyIcon />
            <p className="text-slate-500 text-sm font-body">No transactions yet</p>
            <p className="text-slate-600 text-xs font-body mt-1">Buy your first gold to get started!</p>
          </div>
        )}

        {/* Transaction cards */}
        {!isLoading && transactions.map((txn, index) => (
          <div
            key={txn.transaction_id || index}
            className="rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-amber-500/20 transition-all duration-200 p-3.5 group"
          >
            {/* Top row: amount + gold grams */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white font-display font-bold text-sm">
                ₹{(txn.amount_paid || 0).toLocaleString("en-IN")}
              </span>
              <span className="text-amber-400 font-display font-semibold text-xs bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                +{(txn.gold_grams || 0).toFixed(6)}g
              </span>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <p className="text-xs text-slate-500 font-mono truncate">
                #{txn.transaction_id}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer badge ── */}
      <div className="px-4 py-3 border-t border-slate-800/60">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500 font-body">All gold 100% insured & secured</span>
        </div>
      </div>
    </aside>
  );
};

export default TransactionSidebar;
