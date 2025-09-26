document.addEventListener("DOMContentLoaded", () => {
    console.log("Vite + TypeScript funcionando ✅");
});
const botonmas = document.querySelector<HTMLButtonElement>('#bmas');
const botonmen = document.querySelector<HTMLButtonElement>('#bmen');
let resultado = document.querySelector<HTMLOutputElement>('#res');

botonmas?.addEventListener('click', () => {
    console.log('Boton mas se lee');
    const actual = Number(resultado?.textContent);
    resultado!.textContent = String(actual + 1)
    console.log(actual)
});

botonmen?.addEventListener('click', () => {
    console.log('Boton men se lee');
    const valor = Number(resultado?.textContent);
    resultado!.textContent = String(valor - 1);
    console.log(valor);
});
//----------------------------------------------------------------------

// Variables de estado
let currentInput: string = ''; // Número actual que se está escribiendo
let previousInput: string = ''; // Número anterior
let result: number | null = null; // Resultado parcial o final
let operators: string[] = []; // Almacena los operadores (+, -)

function appendNumber( digit: string): void {
    currentInput += digit
    console.log(currentInput)
}
