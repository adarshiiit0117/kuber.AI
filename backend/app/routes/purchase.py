from fastapi import APIRouter
from pydantic import BaseModel
import uuid

from app.services.gold_service import calculate_gold

from app.db.database import SessionLocal
from app.models.transaction import Transaction

router = APIRouter()


class PurchaseRequest(BaseModel):
    user_id: str
    amount: float


@router.post("/purchase-gold")
def purchase_gold(request: PurchaseRequest):

    db = SessionLocal()

    gold_grams = calculate_gold(request.amount)

    transaction_id = str(uuid.uuid4())[:8]

    new_transaction = Transaction(
        user_id=request.user_id,
        amount_paid=request.amount,
        gold_grams=gold_grams,
        transaction_id=transaction_id
    )

    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)

    return {
        "status": "success",
        "message": "Digital gold purchased successfully",
        "amount_paid": request.amount,
        "gold_grams": gold_grams,
        "transaction_id": transaction_id
    }
@router.get("/transactions/{user_id}")
def get_transactions(user_id: str):

    db = SessionLocal()

    transactions = db.query(Transaction).filter(
        Transaction.user_id == user_id
    ).all()

    result = []

    for txn in transactions:

        result.append({
            "amount_paid": txn.amount_paid,
            "gold_grams": txn.gold_grams,
            "transaction_id": txn.transaction_id
        })

    return {
        "user_id": user_id,
        "transactions": result
    }