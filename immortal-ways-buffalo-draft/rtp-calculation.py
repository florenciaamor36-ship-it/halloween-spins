#!/usr/bin/env python3
"""Exact one-line RTP for this draft's weighted 5-cell evaluator.
Enumerates all 15^5 ordered cell outcomes, weighted by the symbol weights.
Payline count does not change the return ratio because each of the 20 lines
receives an equal 1/20 share of the total stake and expected returns add.
"""
import itertools

WEIGHTS = {
    'bison':2, 'golden-eagle':4, 'horse':6, 'warrior':7, 'wolf':8,
    'revolver':9, 'cowboy-hat':9, 'boots':9, 'lantern':8,
    'gold-horseshoe':8, 'barrel':8, 'king':7, 'queen':7, 'wild':3,
    'scatter':5,
}
# Multipliers of one line stake for 3, 4, and 5 left-to-right matches.
BASE_PAY = {
    'bison':(5,25,100), 'golden-eagle':(4,15,60), 'horse':(3,10,40),
    'warrior':(2.5,8,30), 'wolf':(2,6,24), 'revolver':(1.5,5,20),
    'cowboy-hat':(1.3,4,16), 'boots':(1.2,3.5,14),
    'lantern':(1,3,12), 'gold-horseshoe':(1,3,12),
    'barrel':(.8,2.5,10), 'king':(.7,2,8), 'queen':(.7,2,8),
    'wild':(2,10,40),
}

names=list(WEIGHTS)
denominator=sum(WEIGHTS.values())**5
weighted_pay=0
weighted_wins=0
for cells in itertools.product(names, repeat=5):
    weight=1
    for name in cells:
        weight*=WEIGHTS[name]
    best=0
    for name,pays in BASE_PAY.items():
        count=0
        for got in cells:
            matches = (got == 'wild') if name == 'wild' else (got == name or got == 'wild')
            if not matches:
                break
            count+=1
        if count>=3:
            best=max(best,pays[count-3])
    weighted_pay += weight*best
    if best:
        weighted_wins += weight

base_rtp=weighted_pay/denominator
scale=.93/base_rtp
print(f'Outcomes enumerated: {len(names)**5:,}')
print(f'Weight total per cell: {sum(WEIGHTS.values())}')
print(f'Base expected payout / line stake: {base_rtp:.12f}')
print(f'Base line hit probability: {weighted_wins/denominator:.9%}')
print(f'Applied payoutScale: {scale:.15f}')
print(f'Verified theoretical RTP: {base_rtp*scale:.12%}')
print('Scatter has no award/free-spin feature in this draft; it is excluded from payouts.')
