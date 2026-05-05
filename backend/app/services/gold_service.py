GOLD_PRICE_PER_GRAM = 15142


def calculate_gold(amount: float):

    gold_grams = amount / GOLD_PRICE_PER_GRAM

    return round(gold_grams, 6)


def get_gold_price():

    return GOLD_PRICE_PER_GRAM