#!/usr/bin/env python3
"""Print a vocal-activity strip (harmonic 500-2500 Hz energy) per 0.25 s: helps check line timing."""
import subprocess, sys
import numpy as np

path = sys.argv[1]
raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"])
x = np.frombuffer(raw, dtype=np.float32)
sr, hop, win = 16000, 160, 1024
n = (len(x) - win) // hop
fr = np.lib.stride_tricks.as_strided(x, (n, win), (x.strides[0] * hop, x.strides[0]))
S = np.abs(np.fft.rfft(fr * np.hanning(win), axis=1))
f = np.fft.rfftfreq(win, 1 / sr)
def medfilt(a, k, axis):
    pad = k // 2
    a2 = np.pad(a, [(pad, pad) if i == axis else (0, 0) for i in range(2)], mode="edge")
    return np.median(np.lib.stride_tricks.sliding_window_view(a2, k, axis=axis), axis=-1)
H = medfilt(S, 17, 0); P = medfilt(S, 17, 1)
Hs = S * (H**2 / (H**2 + P**2 + 1e-9))
e = Hs[:, (f > 500) & (f < 2500)].sum(1)
step = 25
ee = e[: len(e) // step * step].reshape(-1, step).mean(1)
ee /= np.percentile(ee, 95)
row = ""
for i, v in enumerate(ee):
    if i % 16 == 0:
        row += f"\n{i // 4:4d}s "
    row += " " if v < 0.25 else ("." if v < 0.45 else ("o" if v < 0.7 else "#"))
print(row)
