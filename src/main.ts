document.addEventListener("DOMContentLoaded", () => {
    console.log("Vite + TypeScript funcionando ✅");
    initializeCounterButtons();
    initializeCalculator();
});

// ============================================
// SECCIÓN: CONTADOR (botones + y -)
// ============================================
function initializeCounterButtons(): void {
    const buttonPlus = document.querySelector<HTMLButtonElement>('#bmas');
    const buttonMinus = document.querySelector<HTMLButtonElement>('#bmen');
    const resultElement = document.querySelector<HTMLOutputElement>('#res');

    buttonPlus?.addEventListener('click', () => {
        console.log('Botón más presionado');
        const currentValue = Number(resultElement?.textContent);
        resultElement!.textContent = String(currentValue + 1);
        console.log('Valor actual:', currentValue);
    });

    buttonMinus?.addEventListener('click', () => {
        console.log('Botón menos presionado');
        const currentValue = Number(resultElement?.textContent);
        resultElement!.textContent = String(currentValue - 1);
        console.log('Valor actual:', currentValue);
    });
}

// ============================================
// SECCIÓN: CALCULADORA
// ============================================

// Estado de la calculadora
interface CalculatorState {
    currentInput: string;
    previousInput: string;
    result: number | null;
    operators: string[];
    currentOperator: string;
    isResultDisplayed: boolean;
    // Variables para el historial de la operación
    previousInputForDisplay: string;
    currentInputForDisplay: string;
    finalResult: string;
}

const state: CalculatorState = {
    currentInput: '',
    previousInput: '',
    result: null,
    operators: [],
    currentOperator: '',
    isResultDisplayed: false,
    previousInputForDisplay: '',
    currentInputForDisplay: '',
    finalResult: ''
};

function initializeCalculator(): void {
    console.log("⚙️ Estado inicial:", state);
}

// Agregar un dígito al input actual
function appendNumber(digit: string): void {
    state.isResultDisplayed = false;
    
    console.log(`✍️ Agregando dígito: ${digit}`);
    state.currentInput += digit;
    state.currentInputForDisplay += digit;
    
    console.log("🧮 currentInput actualizado:", state.currentInput);
    console.log("🧮 currentInputForDisplay actualizado:", state.currentInputForDisplay);
    
    updateDisplayPrincipal();
    updateDisplaySecundario();
}

// Establecer una operación (+, -, etc.)
function setOperation(operator: string): void {
    state.isResultDisplayed = false;

    console.log(`⚡ Operador recibido: ${operator}`);
    
    if (state.currentInput === '') {
        console.log('❌ No hay número para operar');
        return;
    }

    // Primer operador
    if (state.operators.length === 0) {
        state.previousInput = state.currentInput;
        state.currentInput = '';
        state.currentInputForDisplay = '';
        state.operators.push(operator);
        state.currentOperator = operator;
        
        console.log("📥 Primer operador establecido:", {
            previousInput: state.previousInput,
            operators: state.operators
        });
        
        updateDisplaySecundario();
    } 
    // Segundo operador (encadenar operaciones)
    else if (state.operators.length === 1) {
        const num1 = parseFloat(state.previousInput);
        const num2 = parseFloat(state.currentInput);
        
        console.log("🔍 Operación parcial:", {
            num1,
            num2,
            operador: state.operators[0]
        });

        const partialResult = executeOperation(num1, num2, state.operators[0]);
        
        if (partialResult === null) {
            console.log('❌ Operador inválido');
            return;
        }

        state.result = partialResult;
        state.previousInput = partialResult.toString();
        state.currentInput = '';
        state.operators.push(operator);

        console.log("✅ Resultado parcial calculado:", {
            result: state.result,
            previousInput: state.previousInput,
            operators: state.operators
        });
        
        updateDisplaySecundario();
    }
}

// Ejecutar una operación matemática
function executeOperation(num1: number, num2: number, operator: string): number | null {
    if (operator === '+') {
        return num1 + num2;
    } else if (operator === '-') {
        return num1 - num2;
    }
    return null;
}

// Calcular el resultado final
function calculate(): void {
    state.isResultDisplayed = true;

    const expression = `${state.previousInput} ${state.operators[0]} ${state.currentInput}`;
    const displaySecondary = document.querySelector('#displaySecundario') as HTMLOutputElement;
    displaySecondary.value = `${expression} =`;

    console.log("🧮 Iniciando cálculo final");
    
    if (state.currentInput === '' || state.operators.length === 0) {
        console.log("⚠️ currentInput vacío o sin operadores");
        state.currentInput = state.previousInput
        return;
    }

    // Cálculo con dos operadores encadenados
    if (state.operators.length === 2) {
        const num1 = state.result !== null ? state.result : parseFloat(state.previousInput);
        const num2 = parseFloat(state.currentInput);
        
        console.log("🔍 Cálculo con dos operadores:", {
            num1,
            num2,
            operador: state.operators[1]
        });

        const finalResult = executeOperation(num1, num2, state.operators[1]);
        
        if (finalResult === null) {
            console.log('❌ Operador inválido');
            return;
        }

        state.currentInput = finalResult.toString();
        state.previousInput = '';
        state.operators = [];
        state.result = null;

        console.log("✅ Resultado final con dos operadores:", finalResult);
    } 
    // Cálculo con un solo operador
    else if (state.operators.length === 1) {
        state.previousInputForDisplay = state.previousInput;
        
        const num1 = parseFloat(state.previousInput);
        const num2 = parseFloat(state.currentInput);
        
        console.log("🔍 Cálculo con un operador:", {
            num1,
            num2,
            operador: state.operators[0]
        });

        const finalResult = executeOperation(num1, num2, state.operators[0]);
        
        if (finalResult === null) {
            console.log('❌ Operador inválido');
            return;
        }

        state.finalResult = finalResult.toString();
        state.previousInput = state.finalResult;
        state.result = null;

        console.log("✅ Resultado final con un operador:", finalResult);
    }

    updateDisplayPrincipal();
    updateDisplaySecundario();
}

// Actualizar el display secundario (historial de operación)
function updateDisplaySecundario(): void {
    const display = document.querySelector('#displaySecundario') as HTMLOutputElement;
    console.log("📺 Actualizando display Secundario");

    // Mostrar resultado: "1 + 2 ="
    if (state.isResultDisplayed === true) {
        console.log('Display secundario: Mostrando resultado');
        display.value = `${state.previousInputForDisplay} ${state.currentOperator} ${state.currentInput} =`;
    } 
    // Mostrar operación en progreso con ambos números: "1 + 2"
    else if (state.operators.length === 1 && state.previousInputForDisplay && state.currentInput) {
        console.log('Display secundario: Mostrando operación completa');
        display.value = `${state.previousInputForDisplay} ${state.currentOperator} ${state.currentInput}`;
    } 
    // Mostrar solo primer número y operador: "1 +"
    else if (state.operators.length === 1 && state.currentInput === '') {
        console.log('Display secundario: Mostrando operador');
        display.value = `${state.previousInput} ${state.currentOperator}`;
    }

    console.log("🖥️ Valor en display Secundario:", display.value);
}

// Actualizar el display principal (número actual o resultado)
function updateDisplayPrincipal(): void {
    const display = document.querySelector('#displayPrincipal') as HTMLOutputElement;
    console.log("📺 Actualizando display Principal");

    // Mostrar el resultado final
    if (state.operators.length === 1 && state.finalResult) {
        console.log('Display principal: Mostrando resultado final');
        display.value = state.finalResult;
    } 
    // Mostrar el input actual durante la operación
    else if (state.operators.length === 1) {
        console.log('Display principal: Mostrando input actual');
        display.value = state.currentInput;
    } 
    // Por defecto, mostrar el input actual o '0'
    else {
        display.value = state.currentInput || '0';
    }

    console.log("🖥️ Valor en display Principal:", display.value);
}

// Exportar funciones para uso en HTML (si es necesario)
// @ts-ignore
window.appendNumber = appendNumber;
// @ts-ignore
window.setOperation = setOperation;
// @ts-ignore
window.calculate = calculate;