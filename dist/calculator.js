"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
exports.calculate = calculate;
exports.parseAndCalculate = parseAndCalculate;
/**
 * Calculator class providing basic arithmetic operations
 */
class Calculator {
    constructor() {
        this.currentValue = 0;
        this.history = [];
    }
    /**
     * Gets the current calculated value
     */
    get value() {
        return this.currentValue;
    }
    /**
     * Gets the calculation history
     */
    get calculationHistory() {
        return this.history;
    }
    /**
     * Adds a number to the current value
     */
    add(num) {
        this.recordCalculation('add', this.currentValue, num);
        this.currentValue += num;
        return this;
    }
    /**
     * Subtracts a number from the current value
     */
    subtract(num) {
        this.recordCalculation('subtract', this.currentValue, num);
        this.currentValue -= num;
        return this;
    }
    /**
     * Multiplies the current value by a number
     */
    multiply(num) {
        this.recordCalculation('multiply', this.currentValue, num);
        this.currentValue *= num;
        return this;
    }
    /**
     * Divides the current value by a number
     * @throws Error if dividing by zero
     */
    divide(num) {
        if (num === 0) {
            throw new Error('Cannot divide by zero');
        }
        this.recordCalculation('divide', this.currentValue, num);
        this.currentValue /= num;
        return this;
    }
    /**
     * Raises the current value to a power
     */
    power(exponent) {
        this.recordCalculation('power', this.currentValue, exponent);
        this.currentValue = Math.pow(this.currentValue, exponent);
        return this;
    }
    /**
     * Calculates the square root of the current value
     * @throws Error if current value is negative
     */
    sqrt() {
        if (this.currentValue < 0) {
            throw new Error('Cannot calculate square root of negative number');
        }
        this.recordCalculation('sqrt', this.currentValue);
        this.currentValue = Math.sqrt(this.currentValue);
        return this;
    }
    /**
     * Sets the current value directly
     */
    setValue(value) {
        this.currentValue = value;
        return this;
    }
    /**
     * Resets the calculator to initial state
     */
    reset() {
        this.currentValue = 0;
        this.history = [];
        return this;
    }
    /**
     * Clears only the current value, keeping history
     */
    clear() {
        this.currentValue = 0;
        return this;
    }
    /**
     * Evaluates a mathematical expression string
     * @throws Error if expression is invalid
     */
    evaluate(expression) {
        // Validate expression contains only safe characters
        if (!/^[\d+\-*/().\s]+$/.test(expression)) {
            throw new Error('Invalid expression: contains unsafe characters');
        }
        try {
            // Use Function constructor for safe evaluation (no eval)
            const result = new Function('return ' + expression)();
            if (typeof result !== 'number' || !isFinite(result)) {
                throw new Error('Invalid expression result');
            }
            this.currentValue = result;
            this.recordCalculation('evaluate', 0, 0, expression);
            return result;
        }
        catch {
            throw new Error('Invalid expression');
        }
    }
    /**
     * Records a calculation in history
     */
    recordCalculation(operation, leftOperand, rightOperand, expression) {
        this.history.push({
            operation,
            leftOperand,
            rightOperand,
            result: this.currentValue,
            expression,
            timestamp: new Date(),
        });
    }
}
exports.Calculator = Calculator;
/**
 * Performs a calculation from two operands and an operator
 */
function calculate(left, operator, right) {
    switch (operator) {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '*':
            return left * right;
        case '/':
            if (right === 0) {
                throw new Error('Cannot divide by zero');
            }
            return left / right;
        case '^':
            return Math.pow(left, right);
        case '%':
            return left % right;
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}
/**
 * Parses and evaluates a simple expression with two operands
 * Format: "number operator number" (e.g., "5 + 3")
 */
function parseAndCalculate(expression) {
    const match = expression.trim().match(/^(-?\d+(?:\.\d+)?)\s*([+\-*/^%])\s*(-?\d+(?:\.\d+)?)$/);
    if (!match) {
        throw new Error('Invalid expression format. Use: "number operator number"');
    }
    const left = parseFloat(match[1]);
    const operator = match[2];
    const right = parseFloat(match[3]);
    return calculate(left, operator, right);
}
//# sourceMappingURL=calculator.js.map