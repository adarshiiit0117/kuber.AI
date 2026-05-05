from sentence_transformers import SentenceTransformer
import faiss
import pickle
import numpy as np

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load FAISS index
index = faiss.read_index("app/vector_store/gold_index.faiss")

# Load documents
with open("app/vector_store/documents.pkl", "rb") as f:
    documents = pickle.load(f)


def retrieve_context(user_query: str, top_k: int = 3):

    # Convert query to embedding
    query_embedding = model.encode([user_query])

    query_embedding = np.array(query_embedding).astype("float32")

    # Search FAISS index
    distances, indices = index.search(query_embedding, top_k)

    retrieved_docs = []

    for idx in indices[0]:

        if idx < len(documents):
            retrieved_docs.append(documents[idx])

    return "\n".join(retrieved_docs)