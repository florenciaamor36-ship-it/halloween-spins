#!/usr/bin/env python3
"""Reproducible theoretical RTP audit for the modeled Halloween Spins configs.

This calculates only currently implemented shared-engine behavior represented
by the explicit model inputs below; it is not provider math certification.
Run from repository root: python3 rtp-audit.py
"""
from math import comb


def binomial(n, p, k):
    return comb(n, k) * p**k * (1-p)**(n-k)


def line_ev(weights, paytable, wild=None, excluded=()):
    total = sum(weights)
    p = [w/total for w in weights]
    result = 0.0
    for symbol, table in paytable.items():
        if symbol in excluded or symbol == wild:
            continue
        pw = p[wild] if wild is not None else 0.0
        a = p[symbol] + pw
        for count, value in table.items():
            chance = (a**count - pw**count) * (1-a) if count < 5 else a**5-pw**5
            result += chance * value
    if wild is not None:
        result += p[wild]**5 * paytable.get(wild, {}).get(5, 0)
    return result


def special_ev(weights, symbol_indices, paytable, table_symbol=None):
    p = sum(weights[i] for i in symbol_indices)/sum(weights)
    table = paytable[table_symbol if table_symbol is not None else symbol_indices[0]]
    return sum(binomial(15, p, k) * table.get(min(k, 5), 0) for k in range(3, 16))


def free_spin_ev(weights, symbol, awards):
    p = weights[symbol]/sum(weights)
    return sum(binomial(15, p, k) * max((v for threshold, v in awards.items() if k >= threshold), default=0)
               for k in range(16))


def common():
    weights=[91]*10+[40,25,25]
    pay={0:{3:82.53,4:150,5:300},1:{3:33.01,4:82.53,5:165.07},2:{3:33.01,4:82.53,5:165.07},3:{3:33.01,4:82.53,5:165.07},4:{3:33.01,4:82.53,5:165.07},5:{3:16.50,4:33.01,5:82.53},6:{3:16.50,4:33.01,5:82.53},7:{3:16.50,4:33.01,5:82.53},8:{3:16.50,4:33.01,5:82.53},9:{3:16.50,4:33.01,5:82.53},10:{5:300},11:{3:.9,4:1.8,5:3.6},12:{3:0,4:0,5:0}}
    raw=line_ev(weights,pay,10,(11,12))+special_ev(weights,[11],pay)
    efs=free_spin_ev(weights,12,{3:3,4:5,5:8})
    return raw*(1+efs), raw, efs


def jokers():
    w=[139]*5+[140]*2+[0]*5+[25]
    pay={0:{3:84.44,4:153.48,5:269.59},1:{3:33.78,4:84.44,5:168.90},2:{3:33.78,4:84.44,5:168.90},3:{3:16.89,4:33.78,5:84.44},4:{3:16.89,4:33.78,5:84.44},5:{3:16.89,4:33.78,5:84.44},6:{2:.9,3:16.89,4:33.78,5:84.44},12:{3:10,4:50,5:250}}
    return line_ev(w,pay,excluded=(12,))+special_ev(w,[12],pay)


def calibrated_models():
    # BONUS is also a regular payline symbol and triggers 3/5/8 free spins.
    d_w=[110,110,110,40,110,110,110,60,60,60,60,60]
    d_pay={0:{3:25,4:90,5:300},1:{3:20,4:75,5:240},2:{3:18,4:65,5:200},3:{3:12,4:40,5:125},4:{3:10,4:34,5:105},5:{3:8,4:28,5:88},6:{3:6,4:18,5:55},7:{3:9,4:28,5:90},8:{3:7,4:22,5:70},9:{3:6,4:18,5:60},10:{3:5,4:15,5:50},11:{3:4,4:12,5:40}}
    dl=line_ev(d_w,d_pay); de=free_spin_ev(d_w,3,{3:3,4:5,5:8}); d=dl*(1+de)

    # Heaven/hell are distinct icons but combined for the shared scatter award.
    # BONUS index 14 has zero weight and no implemented feature in this config.
    g_w=[30,30,45,45,33,42,42,42,42,42,42,35,7,8,0]
    g_pay={0:{3:2,4:5,5:15},1:{3:2,4:5,5:15},2:{3:1.5,4:4,5:12},3:{3:1.5,4:4,5:12},4:{3:1,4:3,5:8},5:{3:.5,4:1.5,5:5},6:{3:.5,4:1.5,5:5},7:{3:.5,4:1.5,5:5},8:{3:.5,4:1.5,5:5},9:{3:.5,4:1.5,5:5},10:{3:.5,4:1.5,5:5},11:{5:20},12:{3:1,4:2,5:5},13:{3:1,4:2,5:5}}
    g=line_ev(g_w,g_pay,11,(12,13,14))+special_ev(g_w,[12,13],g_pay,12)

    # Three solar scatter colors combine; BONUS awards 5/8/15 free spins.
    h_w=[95,95,90,90,90,85,70,60,50,45,40,20,20,20,20]
    h_pay={0:{3:.8,4:2,5:8},1:{3:.8,4:2,5:8},2:{3:.8,4:2,5:8},3:{3:.8,4:2,5:8},4:{3:.8,4:2,5:8},5:{3:1.2,4:4,5:16},6:{3:1.5,4:5,5:20},7:{3:2,4:8,5:32},8:{3:2.5,4:10,5:40},9:{3:3,4:12,5:60},10:{5:100},11:{3:.2,4:1,5:4},12:{3:.2,4:1,5:4},13:{3:.2,4:1,5:4}}
    hl=line_ev(h_w,h_pay,10,(11,12,13,14)); hs=special_ev(h_w,[11,12,13],h_pay,11)
    he=free_spin_ev(h_w,14,{3:5,4:8,5:15}); h=(hl+hs)*(1+he)
    return {'Duendesitas':(d,{'line':dl,'free_spin_trigger_ev':de}),
            'Good Girl Bad Girl':(g,{}), 'Helios Triple Sun':(h,{'line':hl,'scatter':hs,'free_spin_trigger_ev':he})}


if __name__ == '__main__':
    total,raw,efs=common(); print(f'Common (Halloween/Cleopatra/Pirate/Pirate Mask): raw={raw:.12%}, EFS={efs:.12%}, RTP={total:.12%}, scale={.93/total:.15f}')
    jj=jokers(); print(f"Joker's Jewels: raw={jj:.12%}, scale={.93/jj:.15f}")
    for name,(value,parts) in calibrated_models().items():
        scale={'Duendesitas':5.193753331402799,'Good Girl Bad Girl':15.431960741983840,'Helios Triple Sun':12.605740050940485}[name]
        print(f'{name}: raw={value:.12%}, configured_scale={scale:.15f}, calibrated_RTP={value*scale:.12%}; components={parts}')
    print('Book of the Cleo excluded: 93% assumes Hold & Ring full-board 1000x prize and feature value unscaled by payoutScale.')
    print('V8 Road King excluded: existing 93% scale assumes no jackpot awards. Hot Girls is not modeled/calibrated.')
