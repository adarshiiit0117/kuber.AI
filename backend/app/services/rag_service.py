def retrieve_context(user_query: str):

    with open("app/data/gold_knowledge.txt", "r", encoding="utf-8") as file:

        knowledge = file.readlines()

    relevant_chunks = []

    query_words = user_query.lower().split()

    for line in knowledge:

        for word in query_words:

            if word in line.lower():

                relevant_chunks.append(line.strip())

                break

    if not relevant_chunks:

        relevant_chunks = knowledge[:3]

    return "\n".join(relevant_chunks)
