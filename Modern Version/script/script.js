const rt = document.getElementById("rt");
const r = document.getElementById("result");
const spinner = document.getElementById("spinner");

document.body.onload = () => {
    rt.innerHTML = "";
    r.innerHTML = "Ready";
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


    if (isNaN(n) || n < 2) {
        r.innerHTML = 'indivisible';
        return;
    }
    r.innerHTML = n + ' = ... ';

    if (window.Worker) {
        spinner.style.visibility = "visible";
        const divisorFinder = new Worker('./script/worker.js');
        divisorFinder.postMessage(BigInt(n));

        divisorFinder.onmessage = (e) => {
            if (e.data === 0) {
                divisorFinder.terminate();
                r.innerHTML = r.innerHTML.slice(0, -7) + ' done';
                spinner.style.visibility = "hidden";
                return;
            }

            addline(e.data[0], e.data[1]);
            addNum(e.data[0], e.data[1]);
        }
    }
}

//123476527436522
//https://stackoverflow.com/questions/40128683/how-to-make-a-function-which-counts-for-3-seconds/40128718#40128718