function divisorCount(x) {
    var i;
    var count = 0;

    for (i = x; i > 0; i -= 1) {
        if (x % i == 0)
            count += 1;
    }
    return count;
}

function factor() {
    var x = document.getElementById("num").value,
        i = 1,
        exp = 0;
    var str = "";

    while (x != 1) {
        if (divisorCount(i) == 2) {
            if (x % i == 0) {
                while (x % i == 0) {
                    x /= i;
                    exp += 1;
                }
                str += (i + " ^ " + exp + "<br>");
                exp = 0;
            }
        }
        document.getElementById("str").innerHTML = str;

        i += 1;
    }
}