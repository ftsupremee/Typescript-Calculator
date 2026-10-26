import { Calculator, calculate, parseAndCalculate, Calculation } from './calculator.js';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Basic Operations', () => {
    test('add', () => {
      calculator.add(5);
      expect(calculator.value).toBe(5);

      calculator.add(3);
      expect(calculator.value).toBe(8);
    });

    test('subtract', () => {
      calculator.setValue(10);
      calculator.subtract(3);
      expect(calculator.value).toBe(7);

      calculator.subtract(5);
      expect(calculator.value).toBe(2);
    });

    test('multiply', () => {
      calculator.setValue(4);
      calculator.multiply(3);
      expect(calculator.value).toBe(12);

      calculator.multiply(2);
      expect(calculator.value).toBe(24);
    });

    test('divide', () => {
      calculator.setValue(20);
      calculator.divide(4);
      expect(calculator.value).toBe(5);

      calculator.divide(2);
      expect(calculator.value).toBe(2.5);
    });

    test('divide by zero throws error', () => {
      calculator.setValue(10);
      expect(() => calculator.divide(0)).toThrow('Cannot divide by zero');
    });

    test('power', () => {
      calculator.setValue(2);
      calculator.power(3);
      expect(calculator.value).toBe(8);

      calculator.power(2);
      expect(calculator.value).toBe(64);
    });

    test('sqrt', () => {
      calculator.setValue(16);
      calculator.sqrt();
      expect(calculator.value).toBe(4);

      calculator.setValue(2);
      calculator.sqrt();
      expect(calculator.value).toBeCloseTo(Math.sqrt(2));
    });

    test('sqrt of negative throws error', () => {
      calculator.setValue(-4);
      expect(() => calculator.sqrt()).toThrow('Cannot calculate square root of negative number');
    });
  });

  describe('Chaining Operations', () => {
    test('chaining multiple operations', () => {
      calculator
        .setValue(10)
        .add(5)
        .multiply(2)
        .subtract(4)
        .divide(3);

      expect(calculator.value).toBeCloseTo(22 / 3);
    });
  });

  describe('Value Management', () => {
    test('setValue', () => {
      calculator.setValue(42);
      expect(calculator.value).toBe(42);
    });

    test('clear', () => {
      calculator.setValue(100);
      calculator.clear();
      expect(calculator.value).toBe(0);
    });

    test('reset', () => {
      calculator.setValue(100);
      calculator.add(50);
      calculator.reset();
      expect(calculator.value).toBe(0);
      expect(calculator.calculationHistory).toHaveLength(0);
    });
  });

  describe('History', () => {
    test('records calculations in history', () => {
      calculator.setValue(10);
      calculator.add(5);
      calculator.multiply(2);

      const history = calculator.calculationHistory;
      expect(history).toHaveLength(2);

      expect(history[0]).toMatchObject({
        operation: 'add',
        leftOperand: 10,
        rightOperand: 5,
        result: 15,
      });

      expect(history[1]).toMatchObject({
        operation: 'multiply',
        leftOperand: 15,
        rightOperand: 2,
        result: 30,
      });
    });

    test('history includes timestamps', () => {
      calculator.add(5);
      const history = calculator.calculationHistory;
      expect(history[0].timestamp).toBeInstanceOf(Date);
    });

    test('reset clears history', () => {
      calculator.add(5);
      calculator.reset();
      expect(calculator.calculationHistory).toHaveLength(0);
    });

    test('clear keeps history', () => {
      calculator.add(5);
      calculator.clear();
      expect(calculator.calculationHistory).toHaveLength(1);
    });
  });

  describe('evaluate', () => {
    test('evaluates simple expressions', () => {
      const result = calculator.evaluate('2 + 3');
      expect(result).toBe(5);
      expect(calculator.value).toBe(5);
    });

    test('evaluates complex expressions', () => {
      const result = calculator.evaluate('2 + 3 * 4');
      expect(result).toBe(14);
    });

    test('evaluates expressions with parentheses', () => {
      const result = calculator.evaluate('(2 + 3) * 4');
      expect(result).toBe(20);
    });

    test('evaluates decimal numbers', () => {
      const result = calculator.evaluate('1.5 + 2.5');
      expect(result).toBe(4);
    });

    test('throws on invalid characters', () => {
      expect(() => calculator.evaluate('2 + alert(1)')).toThrow('Invalid expression');
    });

    test('throws on division by zero in expression', () => {
      expect(() => calculator.evaluate('5 / 0')).toThrow('Invalid expression');
    });
  });
});

describe('calculate function', () => {
  test('addition', () => {
    expect(calculate(5, '+', 3)).toBe(8);
  });

  test('subtraction', () => {
    expect(calculate(10, '-', 4)).toBe(6);
  });

  test('multiplication', () => {
    expect(calculate(6, '*', 7)).toBe(42);
  });

  test('division', () => {
    expect(calculate(20, '/', 4)).toBe(5);
  });

  test('division by zero throws', () => {
    expect(() => calculate(10, '/', 0)).toThrow('Cannot divide by zero');
  });

  test('power', () => {
    expect(calculate(2, '^', 3)).toBe(8);
  });

  test('modulo', () => {
    expect(calculate(10, '%', 3)).toBe(1);
  });

  test('unknown operator throws', () => {
    expect(() => calculate(5, '&', 3)).toThrow('Unknown operator: &');
  });
});

describe('parseAndCalculate function', () => {
  test('parses simple addition', () => {
    expect(parseAndCalculate('5 + 3')).toBe(8);
  });

  test('parses subtraction', () => {
    expect(parseAndCalculate('10 - 4')).toBe(6);
  });

  test('parses multiplication', () => {
    expect(parseAndCalculate('6 * 7')).toBe(42);
  });

  test('parses division', () => {
    expect(parseAndCalculate('20 / 4')).toBe(5);
  });

  test('parses power', () => {
    expect(parseAndCalculate('2 ^ 3')).toBe(8);
  });

  test('parses modulo', () => {
    expect(parseAndCalculate('10 % 3')).toBe(1);
  });

  test('handles decimals', () => {
    expect(parseAndCalculate('1.5 + 2.5')).toBe(4);
  });

  test('handles negative numbers', () => {
    expect(parseAndCalculate('-5 + 3')).toBe(-2);
    expect(parseAndCalculate('5 + -3')).toBe(2);
    expect(parseAndCalculate('-5 * -3')).toBe(15);
  });

  test('handles whitespace', () => {
    expect(parseAndCalculate('  5   +   3  ')).toBe(8);
  });

  test('throws on invalid format', () => {
    expect(() => parseAndCalculate('5 +')).toThrow('Invalid expression format');
    expect(() => parseAndCalculate('5')).toThrow('Invalid expression format');
    expect(() => parseAndCalculate('five + three')).toThrow('Invalid expression format');
  });
});