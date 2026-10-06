"""Exact symbol-weight RTP estimate for the provisional Road King math.
Assumes 5x3 independent weighted symbols, all 20 paylines, no jackpot,
3/5/8 free spins at 3/4/5+ BONUS, and no free-spin retrigger.
"""
from math import comb

WEIGHTS = [75, 75, 75, 85, 85, 85, 85, 87, 86, 86, 86, 40, 25, 25]
TOTAL = 1000
WILD, SCATTER, BONUS = 11, 12, 13
PAYS = {
    0: {3: 82.53, 4: 150, 5: 300},
    1: {3: 33.01, 4: 82.53, 5: 165.07},
    2: {3: 33.01, 4: 82.53, 5: 165.07},
    3: {3: 33.01, 4: 82.53, 5: 165.07},
    4: {3: 33.01, 4: 82.53, 5: 165.07},
    5: {3: 33.01, 4: 82.53, 5: 165.07},
    6: {3: 33.01, 4: 82.53, 5: 165.07},
    7: {3: 16.50, 4: 33.01, 5: 82.53},
    8: {3: 16.50, 4: 33.01, 5: 82.53},
    9: {3: 16.50, 4: 33.01, 5: 82.53},
    10: {3: 16.50, 4: 33.01, 5: 82.53},
    11: {5: 300},
    12: {3: 0.9, 4: 1.8, 5: 3.6},
    13: {3: 0, 4: 0, 5: 0},
}

def binomial(n, k, p):
    return comb(n, k) * p**k * (1-p)**(n-k)

assert len(WEIGHTS) == len(PAYS) == 14 and sum(WEIGHTS) == TOTAL
prob = [w / TOTAL for w in WEIGHTS]
p_wild, p_scatter, p_bonus = prob[WILD], prob[SCATTER], prob[BONUS]

# Expected one-payline return per unit line stake.
line_return = 0.0
for symbol in range(11):
    compatible = prob[symbol] + p_wild
    for count in (3, 4):
        exact = (compatible**count - p_wild**count) * (1-compatible)
        line_return += exact * PAYS[symbol][count]
    line_return += (compatible**5 - p_wild**5) * PAYS[symbol][5]
line_return += p_wild**5 * PAYS[WILD][5]

scatter_return = sum(
    binomial(15, count, p_scatter) * PAYS[SCATTER][min(count, 5)]
    for count in range(3, 16)
)
free_spins_per_paid_spin = sum(
    binomial(15, count, p_bonus) * (3 if count == 3 else 5 if count == 4 else 8)
    for count in range(3, 16)
)
raw_rtp = (line_return + scatter_return) * (1 + free_spins_per_paid_spin)
payout_scale = 0.93 / raw_rtp

print(f"Expected line return: {line_return:.12f}")
print(f"Expected SCATTER return: {scatter_return:.12f}")
print(f"Expected free spins per paid spin: {free_spins_per_paid_spin:.12f}")
print(f"Raw RTP before payout scale: {raw_rtp:.12%}")
print(f"Scale for 93% target: {payout_scale:.15f}")
print(f"Scaled RTP: {raw_rtp * payout_scale:.12%}")
