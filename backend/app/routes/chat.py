from fastapi import APIRouter
from pydantic import BaseModel
import json

from app.services.llm_service import generate_response

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    session_id: str


@router.post("/chat")
def chat(request: ChatRequest):

    ai_response = generate_response(
        request.message,
        request.session_id
    )

    try:
        parsed_response = json.loads(ai_response)
        return parsed_response

    except:
        return {
            "response": ai_response,
            "show_cta": False
        }