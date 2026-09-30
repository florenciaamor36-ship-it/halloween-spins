# Immortal Ways Buffalo — working 5×5 draft

Run locally with `python3 -m http.server 8000` from this folder, then open `http://localhost:8000/`. This is a standalone 5×5 prototype page; it does not replace or modify the shared production slot engine. The frame, loading poster, and custom normal/pressed SPIN artwork are now used in this draft.

## 5×5 symbol curation

Ordinary symbol order, highest to lowest: **Bison (#19) > Golden Eagle (#18) > Horse (#3) > Warrior (#2) > Wolf (#1) > Revolver (#4) > Cowboy Hat (#5) > Boots (#6) > Lantern (#7) > Gold Horseshoe (#8) > Barrel (#13) > K (#10) > Q (#15)**. **WILD (#16)** substitutes for ordinary symbols and **SCATTER (#17)** is kept special, not in ordinary pays. Thus 15 symbols appear in the draft.

Rejected from ordinary reels: **#9** is a full title/logo card with an A, not a clean isolated A symbol; **#11** is a duplicate eagle subject, so the more on-theme gold eagle #18 is used; **#12** is a dark duplicate horseshoe, so the gold #8 is selected; **#14** is a branded K/logo card duplicating the standalone K #10. Images #1–18 were PNGs; #19 was a JPEG.

## Weights and paytable

Weights per cell total 100: Bison 2, Golden Eagle 4, Horse 6, Warrior 7, Wolf 8, Revolver 9, Cowboy Hat 9, Boots 9, Lantern 8, Gold Horseshoe 8, Barrel 8, K 7, Q 7, Wild 3, Scatter 5.

Each 5-cell left-to-right payline pays its best eligible 3/4/5-prefix. Wild substitutes for normal symbols; 3+ consecutive wilds also have a Wild pay. Multipliers are applied to the individual line stake (total bet / 20):

| Symbol | 3 | 4 | 5 |
|---|---:|---:|---:|
| Bison | 167.04× | 835.18× | 3340.71× |
| Golden Eagle | 133.63× | 501.11× | 2004.43× |
| Horse | 100.22× | 334.07× | 1336.29× |
| Warrior | 83.52× | 267.26× | 1002.21× |
| Wolf | 66.81× | 200.44× | 801.77× |
| Revolver | 50.11× | 167.04× | 668.14× |
| Cowboy Hat | 43.43× | 133.63× | 534.51× |
| Boots | 40.09× | 116.92× | 467.70× |
| Lantern | 33.41× | 100.22× | 400.89× |
| Gold Horseshoe | 33.41× | 100.22× | 400.89× |
| Barrel | 26.73× | 83.52× | 334.07× |
| K | 23.38× | 66.81× | 267.26× |
| Q | 23.38× | 66.81× | 267.26× |
| Wild | 66.81× | 334.07× | 1336.29× |

**RTP verification:** exact exhaustive enumeration of all 15^5 = 759,375 ordered five-cell outcomes yields a base expectation of **0.0278383616× per line stake**, with line hit probability 1.4381%. The global scale is **33.407138443089984**, so the theoretical expected return is **93.000000%**. On 20 paylines, each wagered at 1/20 of the spin stake, linearity of expectation keeps the spin RTP at 93%. The payout multiplier factor is large because the deliberately rare, independently weighted 5-symbol outcomes have low base expectation. Re-run `python3 rtp-calculation.py` to verify. No Scatter award or free-spin mechanic is included yet, so this 93% applies only to the present line-pay draft and must be recalculated if bonus rules are added.

The 20 paylines are five straight rows plus fifteen zig-zag paths encoded in `game.js`. Symbols are sampled independently with the listed weights on a 5×5 board. The prototype makes a 1.00-credit total bet per spin, split evenly among 20 lines.

## Asset processing and current limitation

The downloaded source images are preserved in `incoming/`. Isolated WebP symbols are in `assets/symbols/`; frame, loading poster, and the reviewed normal/pressed SPIN cutouts are in `assets/frame/`, `assets/loading/`, and `assets/buttons/`. The Bison effect is a restrained short bounce/zoom, one golden sheen, and tiny edge glints only—no large halo. The Lobo source carries a small generator mark, and the Q art is less cohesive than the gold-framed symbols, so both remain reviewable draft choices.

This prototype follows the user's supplied **5×5 frame**, not the original Immortal Ways Buffalo mechanic of six reels with variable heights. That rules/layout mismatch remains an explicit open decision for a later production adaptation.
