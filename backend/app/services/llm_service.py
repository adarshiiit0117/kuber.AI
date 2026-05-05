from groq import Groq
from dotenv import load_dotenv
import os
import json
from app.services.gold_service import get_gold_price
from app.services.memory_store import conversation_memory
from app.services.rag_service import retrieve_context

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_response(user_message: str, session_id: str):

    try:

        # Create session memory if not exists
        if session_id not in conversation_memory:
            conversation_memory[session_id] = []

        previous_messages = conversation_memory[session_id]

        # Retrieve relevant RAG knowledge
        retrieved_context = retrieve_context(user_message)
        current_gold_price = get_gold_price()

        # System prompt
        system_prompt = f"""
You are a friendly AI financial assistant for SimplifyMoney.

Use the following financial knowledge while answering:

{retrieved_context}

Current digital gold price:
₹{current_gold_price} per gram

IMPORTANT:
- If user asks current gold rate, ALWAYS mention this exact rate.
- Do NOT say you don't know the current price.
- Do NOT tell user to check external websites.
- Use the provided price confidently.
- Keep responses under 120 words
- Use short paragraphs
- Use bullet points occasionally
- Be concise like fintech apps
STRICT RULES:
- You are ONLY a fintech and gold investment assistant.
- Never answer programming questions.
- Never generate coding solutions.
- Never explain algorithms or data structures.
- If user asks unrelated technical/programming questions, politely redirect back to finance topics.
- Stay focused on gold investment, digital gold, savings, inflation, portfolio diversification, and personal finance.
If query is unrelated to finance or gold investment:
Return:

{{
  "response": "I specialize in gold investment and personal finance assistance. Please ask me about gold, investing, savings, or digital gold.",
  "intent": "non_finance",
  "show_cta": false
}}
IMPORTANT:
Return ONLY valid JSON.

Example:
{{
  "response": "response text",
  "intent": "gold_investment",
  "show_cta": true,
  "cta_text": "Buy Digital Gold"
}}

Rules:

1. Educational gold questions:
- Usually keep show_cta = false
- But naturally mention digital gold in response

Examples:
"Why is gold valuable?"
"What are benefits of gold?"

2. Moderate investment intent:
- show_cta can be true if user is exploring investment options

Examples:
"Should I invest in gold?"
"How can beginners invest in gold?"
"Is digital gold safe?"

3. Strong buying intent:
- ALWAYS set show_cta = true

Examples:
"I want to buy gold"
"Help me invest now"
"Buy digital gold"

IMPORTANT:
Behave like a helpful fintech assistant.
Do not aggressively push purchases.
Use subtle financial nudges naturally.
"""

        # Build conversation messages
        messages = [
            {
                "role": "system",
                "content": system_prompt
            }
        ]

        # Add previous conversation history
        messages.extend(previous_messages)

        # Add current user message
        messages.append({
            "role": "user",
            "content": user_message
        })

        # Generate AI response
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )

        ai_response = completion.choices[0].message.content

        # Save user message in memory
        conversation_memory[session_id].append({
            "role": "user",
            "content": user_message
        })

        # Save assistant response in memory
        conversation_memory[session_id].append({
            "role": "assistant",
            "content": ai_response
        })

        return ai_response

    except Exception as e:

        return json.dumps({
            "response": f"Error: {str(e)}",
            "intent": "error",
            "show_cta": False
        })