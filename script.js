const pantalla = document.getElementById("pantalla");
const historial = document.getElementById("historial");
const historyList = document.getElementById("historyList");
const modoBtn = document.getElementById("modoBtn");

let expresion = "";
let modoGrados = true;
let historialArray = [];

// =================
// AGREGAR
// =================
function agregar(valor) {

    if (valor === "π") {
        pantalla.value += "π";
        expresion += "Math.PI";
        return;
    }

    if (valor === "e") {
        pantalla.value += "e";
        expresion += "Math.E";
        return;
    }

    if (valor === "^") {
        pantalla.value += "^";
        expresion += "**";
        return;
    }

    pantalla.value += valor;
    expresion += valor;
}

// =================
// FUNCIONES
// =================
function funcion(tipo) {

    if (tipo === "sqrt") {
        pantalla.value += "√(";
        expresion += "Math.sqrt(";
    }

    if (tipo === "sin") {
        pantalla.value += "sin(";
        expresion += "sinCalc(";
    }

    if (tipo === "cos") {
        pantalla.value += "cos(";
        expresion += "cosCalc(";
    }

    if (tipo === "tan") {
        pantalla.value += "tan(";
        expresion += "tanCalc(";
    }

    if (tipo === "log") {
        pantalla.value += "log(";
        expresion += "Math.log10(";
    }

    if (tipo === "ln") {
        pantalla.value += "ln(";
        expresion += "Math.log(";
    }
}

// =================
// TRIGONOMETRIA
// =================
function sinCalc(x) {
    return modoGrados ? Math.sin(x * Math.PI / 180) : Math.sin(x);
}

function cosCalc(x) {
    return modoGrados ? Math.cos(x * Math.PI / 180) : Math.cos(x);
}

function tanCalc(x) {
    return modoGrados ? Math.tan(x * Math.PI / 180) : Math.tan(x);
}

// =================
// MODO DEG/RAD
// =================
function cambiarModo() {
    modoGrados = !modoGrados;
    modoBtn.textContent = modoGrados ? "DEG" : "RAD";
}

// =================
// LIMPIAR
// =================
function limpiar() {
    pantalla.value = "";
    historial.textContent = "";
    expresion = "";
}

// =================
// BORRAR
// =================
function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
    expresion = expresion.slice(0, -1);
}

// =================
// SIGNO
// =================
function cambiarSigno() {
    try {
        let r = eval(expresion) * -1;
        pantalla.value = r;
        expresion = r.toString();
    } catch {
        pantalla.value = "Error";
    }
}

// =================
// FACTORIAL
// =================
function factorial() {
    try {
        let num = eval(expresion);
        let res = 1;
        for (let i = 1; i <= num; i++) res *= i;

        pantalla.value = res;
        expresion = res.toString();
    } catch {
        pantalla.value = "Error";
    }
}

// =================
// CALCULAR
// =================
function calcular() {
    try {
        let resultado = eval(expresion);

        historial.textContent = pantalla.value;
        pantalla.value = resultado;

        historialArray.unshift(historial.textContent + " = " + resultado);
        actualizarHistorial();

        expresion = resultado.toString();
    } catch {
        pantalla.value = "Error";
    }
}

// =================
// HISTORIAL VISUAL
// =================
function actualizarHistorial() {
    historyList.innerHTML = historialArray
        .map(item => `<div>${item}</div>`)
        .join("");
}

// =================
// TECLADO
// =================
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/().".includes(e.key)) agregar(e.key);
    if (e.key === "Enter") calcular();
    if (e.key === "Backspace") borrar();
    if (e.key === "Escape") limpiar();
});