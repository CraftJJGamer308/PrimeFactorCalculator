const rt = document.getElementById("rt");
const r = document.getElementById("result");
const pbar = document.getElementById("pbar");

document.body.onload = () => {
    rt.innerHTML = "";
    r.innerHTML = "Ready";
    pbar.innerHTML = "";
    pbar.style = "width: 69%;";
}

function addline(n, exp) {

    rt.innerHTML = rt.innerHTML +
        `<tr>
        <td>`+ n + `</td>
        <td>`+ exp + `</td>
    </tr>`
}

function addNum(n, exp) {
    r.innerHTML = r.innerHTML.slice(0, -4) + n + "<sup>" + (exp != 1 ? exp : '') + "</sup>" + " × ... ";
}

function start() {
    const n = document.getElementById("num").value;
    rt.innerHTML = "";
    pbar.innerHTML = "";
    pbar.style = "width: 0%;";

    if (isNaN(n) || n < 2) {
        r.innerHTML = 'indivisible';
        return;
    }
    r.innerHTML = n + ' = ... ';

    if (window.Worker) {
        const divisorFinder = new Worker('./script/worker.js');
        divisorFinder.postMessage(BigInt(n));

        divisorFinder.onmessage = (e) => {
            if (e.data === 0) {
                divisorFinder.terminate();
                r.innerHTML = r.innerHTML.slice(0, -7);
                pbar.innerHTML = "done";
                pbar.style = "width: 100%;";
                return;
            }
            else if (e.data[2]) {
                addline(e.data[0], e.data[1]);
                addNum(e.data[0], e.data[1]);
            }
            else {
                pbar.innerHTML = "Trying " + e.data[0] + " of " + e.data[1];
                pbar.style = "width: " + String(e.data[0] * 100n / e.data[1]) + "%;";
            }
        }
    }
}

//123476527436522
//https://stackoverflow.com/questions/40128683/how-to-make-a-function-which-counts-for-3-seconds/40128718#40128718