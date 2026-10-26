/**
 * Calculator class providing basic arithmetic operations
 */
export class Calculator {
  private currentValue: number = 0;
  private history: Calculation[] = [];

  /**
   * Gets the current calculated value
   */
  get value(): number {
    return this.currentValue;
  }

  /**
   * Gets the calculation history
   */
  get calculationHistory(): ReadonlyArray<Calculation> {
    return this.history;
  }

  /**
   * Adds a number to the current value
   */
  add(num: number): this {
    this.recordCalculation('add', this.currentValue, num);
    this.currentValue += num;
    return this;
  }

  /**
   * Subtracts a number from the current value
   */
  subtract(num: number): this {
    this.recordCalculation('subtract', this.currentValue, num);
    this.currentValue -= num;
    return this;
  }

  /**
   * Multiplies the current value by a number
   */
  multiply(num: number): this {
    this.recordCalculation('multiply', this.currentValue, num);
    this.currentValue *= num;
    return this;
  }

  /**
   * Divides the current value by a number
   * @throws Error if dividing by zero
   */
  divide(num: number): this {
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
  power(exponent: number): this {
    this.recordCalculation('power', this.currentValue, exponent);
    this.currentValue = Math.pow(this.currentValue, exponent);
    return this;
  }

  /**
   * Calculates the square root of the current value
   * @throws Error if current value is negative
   */
  sqrt(): this {
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
  setValue(value: number): this {
    this.currentValue = value;
    return this;
  }

  /**
   * Resets the calculator to initial state
   */
  reset(): this {
    this.currentValue = 0;
    this.history = [];
    return this;
  }

  /**
   * Clears only the current value, keeping history
   */
  clear(): this {
    this.currentValue = 0;
    return this;
  }

  /**
   * Evaluates a mathematical expression string
   * @throws Error if expression is invalid
   */
  evaluate(expression: string): number {
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
    } catch {
      throw new Error('Invalid expression');
    }
  }

  /**
   * Records a calculation in history
   */
  private recordCalculation(
    operation: string,
    leftOperand: number,
    rightOperand?: number,
    expression?: string
  ): void {
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

/**
 * Represents a single calculation in history
 */
export interface Calculation {
  operation: string;
  leftOperand: number;
  rightOperand?: number;
  result: number;
  expression?: string;
  timestamp: Date;
}

/**
 * Performs a calculation from two operands and an operator
 */
export function calculate(left: number, operator: string, right: number): number {
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
export function parseAndCalculate(expression: string): number {
  const match = expression.trim().match(/^(-?\d+(?:\.\d+)?)\s*([+\-*/^%])\s*(-?\d+(?:\.\d+)?)$/);

  if (!match) {
    throw new Error('Invalid expression format. Use: "number operator number"');
  }

  const left = parseFloat(match[1]);
  const operator = match[2];
  const right = parseFloat(match[3]);

  return calculate(left, operator, right);
}