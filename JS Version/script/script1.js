function sqrt(value) {
    if (value < 0n) throw "err"

    if (value < 2n) return value;

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

function factor() {
    var x = BigInt(document.getElementById("num").value),
        i = 2n,
        exp = 0,
        lim = BigInt(sqrt(x));
    var str = String(x) + " = ";

    if (x < 2) {
        document.getElementById("result").innerHTML = "UNABLE TO PRIME FACTOR " + x;
        return;
    }

    while (1) {
        if (x == 1) break;
        if (i > lim) {
            str += String(x) + " *";
            break;
        }

        if (prime(i) == true) {
            if (x % BigInt(i) == 0) {
                while (x % BigInt(i) == 0) {
                    x /= BigInt(i);
                    exp += 1;
                }
                str += (i + "<sup>" + (exp != 1 ? exp : '') + "</sup>" + " × ");
                exp = 0;
                lim = sqrt(x)
            }
        }
        i += (i == 2) ? 1n : 2n;
    }

    str = str.slice(0, -2);
    document.getElementById("result").innerHTML = str;
}