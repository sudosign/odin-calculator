// Select display and buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

// Helper functions
function clearDisplay() {
    display.textContent = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
}

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

function appendDecimal() {
    if (shouldResetDisplay) {
        display.textContent = '0';
        shouldResetDisplay = false;
    }
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function back() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = '0';
    }
}

function setOperator(operator) {
    if (currentOperator !== null) calculate();
    firstOperand = parseFloat(display.textContent);
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondOperand = parseFloat(display.textContent);
    let result;

    switch (currentOperator) {
        case '+':
            result = add(firstOperand, secondOperand);
            break;
        case '-':
            result = subtract(firstOperand, secondOperand);
            break;
        case 'x':
            result = multiply(firstOperand, secondOperand);
            break;
        case '/':
            if (secondOperand === 0) {
                display.textContent = "Cannot divide by 0";
                firstOperand = null;
                secondOperand = null;
                currentOperator = null;
                return;
            }
            result = divide(firstOperand, secondOperand);
            break;
        default:
            return;
    }

    display.textContent = Math.round(result * 100) / 100; // Round to 2 decimals
    firstOperand = result;
    currentOperator = null;
}

// Event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent >= '0' && button.textContent <= '9') {
            appendNumber(button.textContent);
        } else if (button.textContent === '.') {
            appendDecimal();
        } else if (['+', '-', 'x', '/'].includes(button.textContent)) {
            setOperator(button.textContent);
        } else if (button.textContent === '=') {
            calculate();
        } else if (button.textContent === 'clear') {
            clearDisplay();
        } else if (button.textContent === 'back') {
            back();
        }
    });
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        setOperator(e.key === '*' ? 'x' : e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'back') {
        back();
    } else if (e.key.toLowerCase() === 'c') {
        clearDisplay();
    }
});

// Basic operations
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}