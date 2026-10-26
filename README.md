# TypeScript Calculator

A simple, well-tested calculator application written in TypeScript with both interactive CLI and programmatic usage.

## Features

- **Basic arithmetic**: Addition, subtraction, multiplication, division
- **Advanced operations**: Power, square root, modulo
- **Expression evaluation**: Full mathematical expressions with parentheses
- **Calculation history**: Track all operations with timestamps
- **Interactive CLI**: REPL mode with command history
- **Non-interactive mode**: Use from command line or scripts
- **TypeScript**: Full type safety and modern ES features
- **Well-tested**: Comprehensive Jest test suite

## Installation

```bash
npm install
npm run build
```

## Usage

### Interactive Mode

```bash
npm start
# or
node dist/index.js
```

This starts an interactive REPL:

```
╔══════════════════════════════════════╗
║     TypeScript Calculator CLI       ║
╚══════════════════════════════════════╝
Type 'help' for commands, 'exit' to quit
calc> 5 + 3
= 8
calc> multiply 4
= 32
calc> history
calc> exit
```

### Non-Interactive Mode

```bash
# Evaluate an expression
node dist/index.js "2 + 3 * 4"
# Output: 14

# Two operands with operator
node dist/index.js 5 + 3
# Output: 8

# Chain commands
node dist/index.js add 10
node dist/index.js multiply 5
# Output: 50
```

### Programmatic Usage

```typescript
import { Calculator, calculate, parseAndCalculate } from './calculator.js';

// Using Calculator class (stateful)
const calc = new Calculator();
calc.setValue(10).add(5).multiply(2);
console.log(calc.value); // 30

// Check history
console.log(calc.calculationHistory);

// Using standalone functions (stateless)
const result = calculate(5, '+', 3); // 8
const parsed = parseAndCalculate('10 / 2'); // 5
```

## Commands (Interactive Mode)

| Command | Alias | Description |
|---------|-------|-------------|
| `add <n>` | `+` | Add number to current value |
| `subtract <n>` | `-`, `sub` | Subtract number from current value |
| `multiply <n>` | `*`, `mul` | Multiply current value by number |
| `divide <n>` | `/`, `div` | Divide current value by number |
| `power <n>` | `^`, `pow` | Raise current value to power |
| `sqrt` | | Square root of current value |
| `set <n>` | | Set current value directly |
| `value` | `val` | Show current value |
| `history` | | Show calculation history |
| `clear` | | Clear current value (keep history) |
| `reset` | | Reset calculator completely |
| `help` | | Show help |
| `exit` / `quit` | | Exit calculator |

## Expressions

The calculator supports full mathematical expressions:

```bash
calc> 2 + 3 * 4
= 14
calc> (2 + 3) * 4
= 20
calc> 10 / 2 + 3 * 2
= 11
```

## Development

```bash
# Run in development mode with ts-node
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build
```

## Project Structure

```
calculator-app/
├── src/
│   ├── calculator.ts      # Core calculator logic
│   ├── calculator.test.ts # Tests
│   ├── cli.ts             # CLI interface
│   └── index.ts           # Entry point
├── dist/                  # Compiled output (after build)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## API

### Calculator Class

```typescript
const calc = new Calculator();

// Operations (chainable)
calc.add(n)
calc.subtract(n)
calc.multiply(n)
calc.divide(n)
calc.power(n)
calc.sqrt()

// Value management
calc.setValue(n)
calc.clear()
calc.reset()

// Expression evaluation
calc.evaluate("2 + 3 * 4")

// Getters
calc.value           // Current value
calc.calculationHistory  // Readonly history array
```

### Standalone Functions

```typescript
calculate(left: number, operator: string, right: number): number
parseAndCalculate(expression: string): number
```

## License

MIT