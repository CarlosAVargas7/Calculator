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
let currentInput: string = '';
let previousInput: string = '';
let result: number | null = null;
let operators: string[] = [];

console.log("⚙️ Estado inicial:", {
    currentInput,
    previousInput,
    result,
    operators
});

function appendNumber(digit: string): void {
    console.log(`✍️ Agregando dígito: ${digit}`);
    currentInput += digit;
    console.log("🧮 currentInput actualizado:", currentInput);
    updateDisplayPrincipal();
    updateDisplaySecundario();
}

function setOperation(op: string): void {
    console.log(`⚡ Operador recibido: ${op}`);
    if (currentInput === '') {
        console.log('❌ No hay número para operar');
        return;
    }

    if (operators.length === 0) {
        previousInput = currentInput;
        currentInput = '';
        operators.push(op);
        console.log("📥 Primer operador establecido:", {
            previousInput,
            operators
        });
    } else if (operators.length === 1) {
        const num1: number = parseFloat(previousInput);
        const num2: number = parseFloat(currentInput);
        console.log("🔍 Operación parcial:", {
            num1,
            num2,
            operador: operators[0]
        });

        let partialResult: number;

        if (operators[0] === '+') {
            partialResult = num1 + num2;
        } else if (operators[0] === '-') {
            partialResult = num1 - num2;
        } else {
            console.log('❌ Operador inválido');
            return;
        }

        result = partialResult;
        previousInput = partialResult.toString();
        currentInput = '';
        operators.push(op);

        console.log("✅ Resultado parcial calculado:", {
            result,
            previousInput,
            operators
        });
    }

    updateDisplaySecundario();
}

function calculate(): void {
    console.log("🧮 Iniciando cálculo final");
    if (currentInput === '' || operators.length === 0) {
        console.log("⚠️ currentInput vacío o sin operadores, usando previousInput");
        currentInput = previousInput;
    }

    if (operators.length === 2) {
        const num1: number = result !== null ? result : parseFloat(previousInput);
        const num2: number = parseFloat(currentInput);
        console.log("🔍 Cálculo con dos operadores:", {
            num1,
            num2,
            operador: operators[1]
        });

        let finalResult: number;

        if (operators[1] === '+') {
            finalResult = num1 + num2;
        } else if (operators[1] === '-') {
            finalResult = num1 - num2;
        } else {
            console.log('❌ Operador inválido');
            return;
        }

        currentInput = finalResult.toString();
        previousInput = '';
        operators = [];
        result = null;

        console.log("✅ Resultado final con dos operadores:", finalResult);
    } else if (operators.length === 1) {
        const num1: number = parseFloat(previousInput);
        const num2: number = parseFloat(currentInput);
        console.log("🔍 Cálculo con un operador:", {
            num1,
            num2,
            operador: operators[0]
        });

        let finalResult: number;

        if (operators[0] === '+') {
            finalResult = num1 + num2;
        } else if (operators[0] === '-') {
            finalResult = num1 - num2;
        } else {
            console.log('❌ Operador inválido');
            return;
        }

        currentInput = finalResult.toString();
        previousInput = '';
        operators = [];
        result = null;

        console.log("✅ Resultado final con un operador:", finalResult);
    }

    updateDisplayPrincipal();
}

function updateDisplaySecundario(): void {
    const display = document.querySelector('#displaySecundario') as HTMLInputElement;
    console.log("📺 Actualizando display Secundario");

    if (operators.length === 1) {
        display.value = `${previousInput} ${operators[0]} ${currentInput}`;
    } else if (operators.length === 2) {
        display.value = `${result} ${operators[1]} ${currentInput}`;
    } else {
        display.value = currentInput || '0';
    }

    console.log("🖥️ Valor en display Secundario:", display.value);
}

function updateDisplayPrincipal(): void {
    const display = document.querySelector('#displayPrincipal') as HTMLInputElement;
    console.log("📺 Actualizando display Principal");

    if (operators.length === 1) {
        display.value = `${currentInput}`;
    } else if (operators.length === 2) {
        display.value = `${result} ${operators[1]}`;
    } else {
        display.value = currentInput || '0';
        
    }

    console.log("🖥️ Valor en display Principal:", display.value);
}