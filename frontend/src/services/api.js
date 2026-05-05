// ============================================================
// frontend/src/services/api.js
// Axios API service — connects to FastAPI backend on port 8000
// ============================================================

import axios from "axios";

// Base URL for the backend
const BASE_URL = "http://127.0.0.1:8000";

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// Send user message to the AI backend with session context
export const sendChatMessage = async (message, sessionId) => {
  const response = await api.post("/chat", { message, session_id: sessionId });
  return response.data; // { response, intent, show_cta, cta_text }
};

// Buy digital gold for a given user and INR amount
export const purchaseGold = async (userId, amount) => {
  const response = await api.post("/purchase-gold", {
    user_id: userId,
    amount: Number(amount),
  });
  return response.data; // { status, message, amount_paid, gold_grams, transaction_id }
};

// Fetch all past gold purchases for a user
export const getTransactions = async (userId) => {
  const response = await api.get(`/transactions/${userId}`);
  return response.data; // { user_id, transactions: [...] }
};

export default api;
