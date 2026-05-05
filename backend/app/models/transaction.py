from sqlalchemy import Column, Integer, String, Float

from app.db.database import Base


class Transaction(Base):

    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(String)

    amount_paid = Column(Float)

    gold_grams = Column(Float)

    transaction_id = Column(String)