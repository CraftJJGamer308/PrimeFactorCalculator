function sqrt(value) {
    if (value < 2n) return value;
    if (value === 4n) return 2n;

    function nI(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return nI(n, x1);
    }

    return nI(value, 1n);
}

function prime(x) {
    var i;
    var count = 0;
    if (x == 2)
        return true;

    for (i = 1n; i <= sqrt(x); i += 2n) {
        if (x % i == 0)
            count += 1;
        if (count >= 2)
            return false;
    }
    return true;
}

onmessage = (e) => {
    var x = e.data;
    var i = 2n,
        exp = 0,
        lim = BigInt(sqrt(x));

    while (1) {
        if (x == 1) {
            postMessage(0);
            break;
        }
        if (i > lim) {
            postMessage([x, 1]);
            postMessage(0);
            break;
        }

        if (prime(i) == true) {
            if (x % BigInt(i) === 0n) {
                while (x % BigInt(i) === 0n) {
                    x /= BigInt(i);
                    exp += 1;
                }
                postMessage([i, exp]);
                exp = 0;
                lim = sqrt(x);
            }
        }
        i += (i === 2n) ? 1n : 2n;
    }
}