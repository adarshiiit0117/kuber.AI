// ============================================================
// TypingIndicator.jsx
// Shows animated dots while the AI is generating a response
// ============================================================

import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3 mb-4 animate-slideUp">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
        <span className="text-xs font-bold text-stone-900">AU</span>
      </div>

      {/* Animated dots bubble */}
      <div className="bg-[#1a1f2e] border border-white/5 px-5 py-4 rounded-2xl rounded-bl-sm shadow-lg shadow-black/40">
        <div className="flex gap-1.5 items-center">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
