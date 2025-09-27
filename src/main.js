"use strict";
document.addEventListener("DOMContentLoaded", () => {
    console.log("Vite + TypeScript funcionando ✅");
});
const botonmas = document.querySelector('#bmas');
const botonmen = document.querySelector('#bmen');
let resultado = document.querySelector('#res');
botonmas?.addEventListener('click', () => {
    console.log('Boton mas se lee');
    const actual = Number(resultado?.textContent);
    resultado.textContent = String(actual + 1);
    console.log(actual);
});
botonmen?.addEventListener('click', () => {
    console.log('Boton men se lee');
    const valor = Number(resultado?.textContent);
    resultado.textContent = String(valor - 1);
    console.log(valor);
});
//----------------------------------------------------------------------
// Variables de estado
let currentInput = ''; // Número actual que se está escribiendo
let previousInput = ''; // Número anterior
let result = null; // Resultado parcial o final
let operators = []; // Almacena los operadores (+, -)
// Función para agregar un dígito al input actual
function appendNumber(digit) {
    currentInput += digit; // Concatena el dígito (ej. "1" + "1" = "11")
    updateDisplay2();
}
// Función para establecer un operador (+ o -)
function setOperation(op) {
    if (currentInput === '') {
        console.log('No hay número para operar');
        return;
    }
    // Si no hay operadores aún, guarda el primer número
    if (operators.length === 0) {
        previousInput = currentInput; // Guarda el número actual (ej. "5")
        currentInput = ''; // Limpia para el siguiente número
        operators.push(op); // Guarda el operador (ej. "+")
    }
    // Si ya hay un operador, calcula el resultado parcial
    else if (operators.length === 1) {
        const num1 = parseFloat(previousInput); // Primer número (ej. 5)
        const num2 = parseFloat(currentInput); // Segundo número (ej. 3)
        let partialResult;
        // Realiza la primera operación
        if (operators[0] === '+') {
            partialResult = num1 + num2; // ej. 5 + 3 = 8
        }
        else if (operators[0] === '-') {
            partialResult = num1 - num2; // ej. 5 - 3 = 2
        }
        else {
            console.log('Operador inválido');
            return;
        }
        result = partialResult; // Guarda el resultado parcial (ej. 8)
        previousInput = partialResult.toString(); // Actualiza previousInput
        currentInput = ''; // Limpia para el tercer número
        operators.push(op); // Guarda el segundo operador (ej. "-")
    }
    updateDisplay();
}
// Función para calcular el resultado final
function calculate() {
    if (currentInput === '' || operators.length === 0) {
        currentInput = previousInput;
    }
    // Si hay dos operadores, calcula el resultado final
    if (operators.length === 2) {
        const num1 = result !== null ? result : parseFloat(previousInput); // Usa el resultado parcial o el primer número
        const num2 = parseFloat(currentInput); // Tercer número (ej. 2)
        let finalResult;
        // Realiza la segunda operación
        if (operators[1] === '+') {
            finalResult = num1 + num2; // ej. 8 + 2 = 10
        }
        else if (operators[1] === '-') {
            finalResult = num1 - num2; // ej. 8 - 2 = 6
        }
        else {
            console.log('Operador inválido');
            return;
        }
        // Actualiza el estado
        currentInput = finalResult.toString(); // Guarda el resultado final
        previousInput = ''; // Limpia
        operators = []; // Limpia los operadores
        result = null; // Limpia el resultado parcial
    }
    // Si solo hay un operador, calcula con los dos números
    else if (operators.length === 1) {
        const num1 = parseFloat(previousInput); // Primer número
        const num2 = parseFloat(currentInput); // Segundo número
        let finalResult;
        if (operators[0] === '+') {
            finalResult = num1 + num2;
        }
        else if (operators[0] === '-') {
            finalResult = num1 - num2;
        }
        else {
            console.log('Operador inválido');
            return;
        }
        currentInput = finalResult.toString();
        previousInput = '';
        operators = [];
        result = null;
    }
    updateDisplay2();
}
// Función para actualizar la pantalla
function updateDisplay() {
    const display = document.querySelector('#display');
    // Si hay operadores, muestra el progreso
    if (operators.length === 1) {
        display.value = `${previousInput} ${operators[0]}`; // ej. "5 +"
    }
    else if (operators.length === 2) {
        display.value = `${result} ${operators[1]}`; // ej. "8 -"
    }
    else {
        display.value = currentInput || '0'; // Muestra el número actual o "0"
    }
}
function updateDisplay2() {
    const display = document.querySelector('#display2');
    // Si hay operadores, muestra el progreso
    if (operators.length === 1) {
        display.value = `${previousInput} ${operators[0]}`; // ej. "5 +"
    }
    else if (operators.length === 2) {
        display.value = `${result} ${operators[1]}`; // ej. "8 -"
    }
    else {
        display.value = currentInput || '0'; // Muestra el número actual o "0"
    }
}
//# sourceMappingURL=main.js.map