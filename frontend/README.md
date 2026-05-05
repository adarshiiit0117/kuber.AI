# GoldAI Frontend — SimplifyMoney

A modern fintech React frontend for the Gold Investment AI assistant.

## Folder Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx        ← Main chat area, message list
│   │   ├── MessageBubble.jsx     ← User/AI message bubbles + typing indicator
│   │   ├── ChatInput.jsx         ← Text input + send button + quick prompts
│   │   ├── CTAInvestmentCard.jsx ← Buy gold CTA card (shown when show_cta=true)
│   │   ├── PurchaseModal.jsx     ← Gold purchase modal with quick amounts
│   │   ├── SuccessCard.jsx       ← Post-purchase success display
│   │   └── TransactionSidebar.jsx← Right sidebar with transaction history
│   ├── services/
│   │   └── api.js                ← Axios API layer (chat, purchase, history)
│   ├── App.jsx                   ← Root component + state management
│   ├── index.js                  ← React DOM entry point
│   └── index.css                 ← Global styles + Tailwind directives
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Installation & Setup

### 1. Navigate to frontend directory
```bash
cd simplify_money/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Tailwind CSS + PostCSS
```bash
npm install -D tailwindcss postcss autoprefixer
```

### 4. Install Axios (if not already in package.json)
```bash
npm install axios
```

### 5. Start the development server
```bash
npm start
```

The app will open at: **http://localhost:3000**

> Make sure the FastAPI backend is running on http://127.0.0.1:8000 first!

## Features

- **AI Chat** — conversational interface with Groq LLM + RAG
- **CTA Cards** — contextual buy prompts when AI detects investment intent  
- **Purchase Modal** — ₹100/500/1000 quick-select or custom amount
- **Success Card** — transaction confirmation with grams + transaction ID
- **Transaction Sidebar** — live portfolio with auto-refresh after purchases
- **Dark fintech UI** — blue/gold theme with glass morphism cards
- **Mobile responsive** — sidebar slides in on mobile

## API Endpoints Used

| Feature | Method | Endpoint |
|---------|--------|----------|
| Chat | POST | /chat |
| Purchase gold | POST | /purchase-gold |
| Transaction history | GET | /transactions/{user_id} |
