let x = '';
let y = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/', 'x2', 'x3', 'x^y'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    x = '';
    y = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;


    let key = event.target.getAttribute('data-action');
    if (!key) {
        key = event.target.textContent;
    }



    if (digit.includes(key)) {
        out.textContent = '';
        let activeButton = document.querySelector('.bg-active');
        if (activeButton !== null) {
            activeButton.classList.remove('bg-active');
        }

        if (y === '' && sign === '') {
            x += key;
            out.textContent = x;
        }
        else if (x !== '' && y !== '' && finish) {
            y = key;
            finish = false;
            out.textContent = y;
        }
        else {
            y += key;
            out.textContent = y;
        }
        console.log(x, y, sign);
        return;
    }


    if (action.includes(key)) {
        sign = key;
        event.target.classList.add('bg-active');
        switch (sign) {
            case "x2":
                x = x * x;
                console.log(x);
                break;
            case "x3":
                x = x * x * x;
                break;
            default:
                return;
        }
        finish = true;
        out.textContent = x;
        document.querySelector('.bg-active').classList.remove('bg-active');
        return;
    }

    if (key === '=') {
        if (y === '') y = x;
        switch (sign) {
            case "+":
                x = (+x) + (+y);
                break;
            case "-":
                x = x - y;
                break;
            case "*":
                x = x * y;
                break;
            case "/":
                if (y === '0') {
                    out.textContent = '0';
                    x = '';
                    y = '';
                    sign = '';
                    return;
                }
                x = x / y;
                break;
            case "x^y":
                x = Math.pow(x,y);
                break;
        }
        finish = true;
        out.textContent = x;
    }
}


const calc = document.querySelector(".calc")
const advanced = document.querySelector(".advanced")
const buttons = document.querySelector(".buttons")

advanced.addEventListener("click", () => {
    calc.classList.toggle("toggle");
    buttons.classList.toggle("toggle");
})