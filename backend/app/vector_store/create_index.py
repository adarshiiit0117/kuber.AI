from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Read knowledge base
with open("app/data/gold_knowledge.txt", "r", encoding="utf-8") as file:
    documents = file.readlines()

documents = [doc.strip() for doc in documents if doc.strip()]

# Generate embeddings
embeddings = model.encode(documents)

# Convert to numpy array
embedding_matrix = np.array(embeddings).astype("float32")

# Create FAISS index
dimension = embedding_matrix.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(embedding_matrix)

# Save index
faiss.write_index(index, "app/vector_store/gold_index.faiss")

# Save documents
with open("app/vector_store/documents.pkl", "wb") as f:
    pickle.dump(documents, f)

print("FAISS index created successfully!")