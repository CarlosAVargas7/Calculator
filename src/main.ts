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
let resultados: string = ''
let previousInput2: string = ''
let currentInput2: string = ''


let isResultDisplayed = false;

console.log("⚙️ Estado inicial:", {
    currentInput,
    previousInput,
    result,
    operators
});

function appendNumber(digit: string): void {
    isResultDisplayed = false;
    console.log(`✍️ Agregando dígito: ${digit}`);
    currentInput += digit;
    currentInput2 += digit;
    console.log("🧮 currentInput actualizado:", currentInput);
    console.log("🧮 currentInput2 actualizado:", currentInput2);
    updateDisplayPrincipal();
    updateDisplaySecundario();
}

let currentOperator: string = ''; // fuera de la función
function setOperation(op: string): void {

    isResultDisplayed = false;

    console.log(`⚡ Operador recibido: ${op}`);
    if (currentInput === '') {
        console.log('❌ No hay número para operar');
        return;
    }

    if (operators.length === 0) {
        previousInput = currentInput;
        currentInput = '';
        currentInput2 = '';
        operators.push(op);
        currentOperator = op
        console.log("📥 Primer operador establecido:", {
            previousInput,
            operators
        }); updateDisplaySecundario()
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
        updateDisplaySecundario();
    }

}

function calculate(): void {

    isResultDisplayed = true;

    const expr = `${previousInput} ${operators[0]} ${currentInput}`;

    const displaySec = document.querySelector('#displaySecundario') as HTMLOutputElement;
    displaySec.value = `${expr} =`;


    console.log("🧮 Iniciando cálculo final");
    if (currentInput === '' || operators.length === 0) {
        console.log("⚠️ currentInput vacío o sin operadores, usando previousInput");
/*         currentInput = previousInput;
 */    }

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
        previousInput2 = previousInput
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
        /* 
                currentInput = currentInput */
/*         previousInput = finalResult.toString();
 */        resultados = finalResult.toString();
        previousInput = resultados
        /*         operators = []; */
        result = null;


        console.log("✅ Resultado final con un operador:", finalResult);
    }

    updateDisplayPrincipal();
    updateDisplaySecundario()
}


function updateDisplaySecundario(): void {
    const display = document.querySelector('#displaySecundario') as HTMLOutputElement;
    console.log("📺 Actualizando display Secundario");

    if (isResultDisplayed === true) {
        // Mostrar como "1 + 2 = "
        console.log('if 1')
        display.value = `${previousInput2} ${currentOperator} ${currentInput} = `
    }
    else if (operators.length === 1 && previousInput2 && currentInput) {
        // ✅ Mostrar como "1 + 2" aqui solo debe mostrarse "1 +" el "previous+operator+current =" solo debe mostrarse cuando se en display principal se muestre el finalresult
        console.log('if 2')
        display.value = `${previousInput2} ${currentOperator} 2`;

    } else if (operators.length === 1 && currentInput === '') {
        // ✅ Mostrar como "1 +"
        console.log('if 3')
        display.value = `${previousInput} ${currentOperator}`;


    }
    /*     else {
            // ✅ Mostrar solo el número actual
            display.value = currentInput || '0';
        } */

    console.log("🖥️ Valor en display Secundario:", display.value);
}


function updateDisplayPrincipal(): void {
    const display = document.querySelector('#displayPrincipal') as HTMLOutputElement;
    console.log("📺 Actualizando display Principal");

    if (operators.length === 1) {
        console.log('AQUI ESTOY')
        display.value = `${currentInput}`;
    }

    if (operators.length === 1 && resultados) {
        display.value = `${resultados}`
    }

    else {
        // ✅ Mostrar solo el número actual
        display.value = currentInput || '0';
    }

    console.log("🖥️ Valor en display Principal:", display.value);
}