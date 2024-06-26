import numpy as np 

def map_feature(x1, x2):
    degree = 6
    out = np.ones([len(x1), (degree + 1) * (degree + 2) // 2])
    idx = 1

    for i in range(1, degree + 1):
        for j in range(0, i + 1):
            a1 = x1 ** (i - j)
            a2 = x2 ** j
            out[:, idx] = a1 * a2
            idx += 1

    return out