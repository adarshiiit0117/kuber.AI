<div align="center">

# 🪙 Kuber AI

### GenAI-Powered Gold Investment Assistant

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Vercel-black?style=for-the-badge)](https://kuber-ai-wheat.vercel.app/)
[![Backend API](https://img.shields.io/badge/⚡_Backend_API-Render-46E3B7?style=for-the-badge)](https://kuber-ai-1.onrender.com)
[![API Docs](https://img.shields.io/badge/📄_Swagger_Docs-OpenAPI-85EA2D?style=for-the-badge)](https://kuber-ai-1.onrender.com/docs)

*A full-stack AI fintech assistant that guides users through gold investment — from curiosity to purchase.*

---

</div>

## ✨ Overview

**Kuber AI** is an intelligent fintech assistant that makes digital gold investment intuitive and conversational. Inspired by SimplifyMoney's gold investment workflow, it combines conversational AI, contextual retrieval, and transaction persistence into a seamless, premium user experience.

> [!IMPORTANT]
> ## ⚠️ First Time Loading?
>
> The backend is hosted on **Render's free tier** and **spins down after inactivity**.
>
> **Follow these steps to avoid a blank screen:**
>
> **Step 1 →** Open the [Backend URL](https://kuber-ai-1.onrender.com) and wait **30–60 seconds** for it to wake up
>
> **Step 2 →** Then open the [Frontend](https://kuber-ai-wheat.vercel.app/)
>
> *Skipping Step 1 may cause the frontend to appear broken on first load.*

---

## 🚀 Features

### 🤖 Conversational AI Assistant
- Multi-turn, memory-aware conversations about gold investment
- Contextual responses grounded in financial knowledge (RAG-style)
- Restricted to finance topics for focused, reliable guidance

### 🧠 Smart Intent Detection
The assistant adapts its response based on user intent:

| User Query | AI Behavior |
|---|---|
| *"Why is gold valuable?"* | Informational response only |
| *"Should I invest in gold?"* | Subtle investment suggestion |
| *"I want to buy gold"* | Triggers full purchase CTA flow |

### 💰 Digital Gold Purchase Flow
1. Express buying intent in chat
2. A smart CTA card appears
3. Enter your investment amount
4. Backend calculates gold quantity at current price
5. Transaction is stored and confirmed with a unique Transaction ID

### 📊 Portfolio Dashboard
- Total invested amount
- Live gold holdings (in grams)
- Full transaction history
- Investment overview sidebar

### 🔧 Engineering Highlights
- **Real-time gold price injection** into AI prompts — prevents hallucinated pricing
- **Session-based memory** for coherent multi-turn conversations
- **RAG-style retrieval** from a financial knowledge base
- **Structured JSON responses** from LLM — clean frontend rendering

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React Icons

</td>
<td valign="top" width="33%">

**Backend**
- FastAPI
- Groq LLM API
- SQLite + SQLAlchemy ORM
- Pydantic

</td>
<td valign="top" width="33%">

**AI / GenAI**
- Prompt Engineering
- Conversational Memory
- RAG-style Retrieval
- Intent Detection
- Context Injection

</td>
</tr>
</table>

**Deployment:** Frontend → Vercel &nbsp;|&nbsp; Backend → Render

---

## 🏗️ Architecture

```
Client (React + Vite)
        │
        ▼
  FastAPI Routes
        │
        ▼
  Service Layer
        │
   ┌────┴────┐
   ▼         ▼
AI + RAG   SQLAlchemy ORM
Logic           │
   │            ▼
   └──────► SQLite DB
```

### GenAI Pipeline

```
User Query
    │
    ▼
FastAPI Route
    │
    ▼
LLM Service
    │
    ▼
Context Retrieval (RAG-style)
    │
    ▼
Prompt Enrichment
(retrieval context + gold price + session memory)
    │
    ▼
Groq LLM
    │
    ▼
Structured JSON Response
    │
    ▼
Frontend Rendering
(chat reply + optional CTA card)
```

---

## 🔍 Retrieval-Augmented Generation (RAG)

The assistant uses lightweight retrieval-based contextual grounding before every LLM call. Relevant financial knowledge is fetched and injected into the prompt at inference time.

**Knowledge base covers:**
- Gold investment concepts & fundamentals
- Inflation hedging with gold
- Digital gold safety & regulation
- Portfolio diversification strategies

**Benefits:**
- Reduces hallucination on financial topics
- Keeps responses consistently gold/finance-focused
- Improves contextual accuracy without fine-tuning
- Enables deterministic, grounded answers

---

## 🧪 FAISS Exploration (Local R&D)

During development, a semantic vector retrieval pipeline was explored locally using FAISS and sentence-transformer embeddings.

**Experimental architecture included:**
- `sentence-transformers` for dense embeddings
- FAISS vector index for similarity search
- Semantic document retrieval over the knowledge base

**Why it wasn't deployed:**

Due to free-tier hosting constraints on Render, the heavy ML dependency overhead (sentence-transformers, FAISS) would have caused memory issues and cold-start failures. The production system uses lightweight keyword-based retrieval instead — preserving contextual AI behavior while keeping the deployment stable and fast.

> This is a deliberate engineering tradeoff, not a limitation. The architecture is designed to swap in vector retrieval when scaling to paid infrastructure.

---

## 📁 Project Structure

```
kuber-ai/
├── backend/
│   ├── app/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── db/              # Database config
│   │   ├── data/            # Knowledge base
│   │   └── main.py
│   ├── requirements.txt
│   └── runtime.txt
│
├── frontend/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages
│       ├── services/        # API integration
│       └── App.jsx
│
└── README.md
```

---

## ⚙️ Local Setup

### Backend

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000` · Swagger Docs at `http://localhost:8000/docs`

---

### Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 📡 API Reference

> Full interactive docs available at [`/docs`](https://kuber-ai-1.onrender.com/docs) via Swagger UI.

---

### `POST /chat`

Main conversational GenAI endpoint. Handles AI conversation, intent detection, contextual retrieval, memory, and CTA generation.

**Request**
```json
{
  "message": "Should I invest in gold?",
  "session_id": "adarsh123"
}
```

**Response**
```json
{
  "response": "Gold can help diversify your portfolio and hedge against inflation.",
  "intent": "gold_investment",
  "show_cta": true,
  "cta_text": "Buy Digital Gold"
}
```

| Field | Description |
|---|---|
| `response` | AI-generated financial guidance |
| `intent` | Detected intent label (`gold_investment`, `educational`, etc.) |
| `show_cta` | Whether to render the purchase CTA card |
| `cta_text` | CTA button label |

---

### `POST /purchase-gold`

Simulates a digital gold purchase — calculates gold quantity, generates a transaction ID, and persists the record.

**Request**
```json
{
  "amount": 500,
  "user_id": "adarsh123"
}
```

**Response**
```json
{
  "status": "success",
  "message": "Digital gold purchased successfully",
  "amount_paid": 500,
  "gold_grams": 0.033021,
  "transaction_id": "0665b086"
}
```

---

### `GET /transactions/{user_id}`

Fetches a user's full portfolio and transaction history. Powers the portfolio sidebar, investment dashboard, and holdings summary.

**Response includes:** invested amounts · gold quantities (g) · transaction references

---

## 🗄️ Database Schema

**Transactions Table**

| Field | Type | Description |
|---|---|---|
| `id` | Integer | Primary Key |
| `amount` | Float | Investment amount (₹) |
| `gold_grams` | Float | Gold quantity purchased |
| `transaction_id` | String | Unique transaction reference |

---

## 🔮 Future Roadmap

- [ ] Live gold pricing API integration
- [ ] Real payment gateway (Razorpay / Stripe)
- [ ] User authentication & profiles
- [ ] Portfolio analytics & charts
- [ ] Vector database deployment (FAISS explored locally → Pinecone for production)
- [ ] Streaming AI responses
- [ ] Personalized investment insights
- [ ] Push notifications

---

## 📚 Key Learning Areas

`GenAI Workflow Orchestration` · `Prompt Engineering` · `RAG & Vector Retrieval` · `FAISS / Embeddings` · `Conversational Memory` · `FastAPI` · `Full-Stack Deployment` · `Fintech Product Design` · `Database Persistence` · `Engineering Tradeoffs`

---

<div align="center">

Built with ❤️ by **Adarsh Dubey**



</div>
