from sentence_transformers import SentenceTransformer
import faiss
import pickle
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INDEX_PATH = os.path.join(BASE_DIR, "vector_store", "gold_index.faiss")
DOC_PATH = os.path.join(BASE_DIR, "vector_store", "documents.pkl")

model = SentenceTransformer("all-MiniLM-L6-v2")

index = faiss.read_index(INDEX_PATH)

with open(DOC_PATH, "rb") as f:
    documents = pickle.load(f)


def retrieve_context(user_query: str, top_k: int = 3):

    query_embedding = model.encode([user_query])

    query_embedding = np.array(query_embedding).astype("float32")

    distances, indices = index.search(query_embedding, top_k)

    retrieved_docs = []

    for idx in indices[0]:

        if idx < len(documents):
            retrieved_docs.append(documents[idx])

    return "\n".join(retrieved_docs)
