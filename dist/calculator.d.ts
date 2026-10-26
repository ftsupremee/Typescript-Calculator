/**
 * Calculator class providing basic arithmetic operations
 */
export declare class Calculator {
    private currentValue;
    private history;
    /**
     * Gets the current calculated value
     */
    get value(): number;
    /**
     * Gets the calculation history
     */
    get calculationHistory(): ReadonlyArray<Calculation>;
    /**
     * Adds a number to the current value
     */
    add(num: number): this;
    /**
     * Subtracts a number from the current value
     */
    subtract(num: number): this;
    /**
     * Multiplies the current value by a number
     */
    multiply(num: number): this;
    /**
     * Divides the current value by a number
     * @throws Error if dividing by zero
     */
    divide(num: number): this;
    /**
     * Raises the current value to a power
     */
    power(exponent: number): this;
    /**
     * Calculates the square root of the current value
     * @throws Error if current value is negative
     */
    sqrt(): this;
    /**
     * Sets the current value directly
     */
    setValue(value: number): this;
    /**
     * Resets the calculator to initial state
     */
    reset(): this;
    /**
     * Clears only the current value, keeping history
     */
    clear(): this;
    /**
     * Evaluates a mathematical expression string
     * @throws Error if expression is invalid
     */
    evaluate(expression: string): number;
    /**
     * Records a calculation in history
     */
    private recordCalculation;
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
export declare function calculate(left: number, operator: string, right: number): number;
/**
 * Parses and evaluates a simple expression with two operands
 * Format: "number operator number" (e.g., "5 + 3")
 */
export declare function parseAndCalculate(expression: string): number;
//# sourceMappingURL=calculator.d.ts.map