# RTP audit (modeled demo behavior)

Run `python3 rtp-audit.py` from the repository root to reproduce the exact theoretical calculations for the common shared-engine themes, Joker's Jewels, Duendesitas, Good Girl Bad Girl, and Helios Triple Sun. The model reflects only the listed/currently implemented payouts, weights, scatter counting, and free-spin behavior; it is not provider-original or certified math. In particular, the Good Girl bonus placeholder has zero weight and no modeled feature. Demo results are not evidence of official game RTP.

Existing calibrations not re-audited here: Book of the Cleo's 93% assumes Hold & Ring's full-board 1000× prize and feature value are not scaled by `payoutScale`; V8 Road King's 93% assumes no jackpot awards. Hot Girls is custom-engineered and unmodeled; it remains provisional and uncalibrated.
