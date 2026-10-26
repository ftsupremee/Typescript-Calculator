"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorCLI = void 0;
exports.runNonInteractive = runNonInteractive;
const calculator_js_1 = require("./calculator.js");
const readline = __importStar(require("readline"));
/**
 * CLI interface for the calculator
 */
class CalculatorCLI {
    constructor() {
        this.calculator = new calculator_js_1.Calculator();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'calc> ',
        });
    }
    /**
     * Starts the interactive calculator session
     */
    start() {
        this.printWelcome();
        this.rl.prompt();
        this.rl.on('line', (input) => {
            const trimmed = input.trim();
            if (trimmed === 'exit' || trimmed === 'quit') {
                this.exit();
                return;
            }
            if (trimmed === 'help') {
                this.printHelp();
                this.rl.prompt();
                return;
            }
            if (trimmed === 'history') {
                this.printHistory();
                this.rl.prompt();
                return;
            }
            if (trimmed === 'clear') {
                this.calculator.clear();
                console.log('Cleared current value');
                this.rl.prompt();
                return;
            }
            if (trimmed === 'reset') {
                this.calculator.reset();
                console.log('Calculator reset');
                this.rl.prompt();
                return;
            }
            try {
                this.processInput(trimmed);
            }
            catch (error) {
                console.error(`Error: ${error.message}`);
            }
            this.rl.prompt();
        });
        this.rl.on('close', () => {
            this.exit();
        });
    }
    /**
     * Processes a single line of input
     */
    processInput(input) {
        // Try to parse as simple expression first
        if (/^-?\d+(?:\.\d+)?\s*[+\-*/^%]\s*-?\d+(?:\.\d+)?$/.test(input)) {
            const result = (0, calculator_js_1.parseAndCalculate)(input);
            this.calculator.setValue(result);
            console.log(`= ${result}`);
            return;
        }
        // Try to evaluate as full expression
        try {
            const result = this.calculator.evaluate(input);
            console.log(`= ${result}`);
            return;
        }
        catch {
            // Not a valid expression, try command parsing
        }
        // Parse commands like "add 5", "multiply 3", etc.
        const parts = input.split(/\s+/);
        const command = parts[0].toLowerCase();
        const arg = parts[1] ? parseFloat(parts[1]) : undefined;
        if (isNaN(arg) && arg !== undefined) {
            console.log('Error: Invalid number');
            return;
        }
        switch (command) {
            case 'add':
            case '+':
                if (arg !== undefined) {
                    this.calculator.add(arg);
                    console.log(`= ${this.calculator.value}`);
                }
                else {
                    console.log('Usage: add <number>');
                }
                break;
            case 'subtract':
            case 'sub':
            case '-':
                if (arg !== undefined) {
                    this.calculator.subtract(arg);
                    console.log(`= ${this.calculator.value}`);
                }
                else {
                    console.log('Usage: subtract <number>');
                }
                break;
            case 'multiply':
            case 'mul':
            case '*':
                if (arg !== undefined) {
                    this.calculator.multiply(arg);
                    console.log(`= ${this.calculator.value}`);
                }
                else {
                    console.log('Usage: multiply <number>');
                }
                break;
            case 'divide':
            case 'div':
            case '/':
                if (arg !== undefined) {
                    this.calculator.divide(arg);
                    console.log(`= ${this.calculator.value}`);
                }
                else {
                    console.log('Usage: divide <number>');
                }
                break;
            case 'power':
            case 'pow':
            case '^':
                if (arg !== undefined) {
                    this.calculator.power(arg);
                    console.log(`= ${this.calculator.value}`);
                }
                else {
                    console.log('Usage: power <exponent>');
                }
                break;
            case 'sqrt':
                this.calculator.sqrt();
                console.log(`= ${this.calculator.value}`);
                break;
            case 'set':
                if (arg !== undefined) {
                    this.calculator.setValue(arg);
                    console.log(`= ${this.calculator.value}`);
                }
                else {
                    console.log('Usage: set <number>');
                }
                break;
            case 'value':
            case 'val':
                console.log(`= ${this.calculator.value}`);
                break;
            default:
                console.log(`Unknown command: ${command}. Type 'help' for available commands.`);
        }
    }
    /**
     * Prints welcome message
     */
    printWelcome() {
        console.log(`
╔══════════════════════════════════════╗
║     TypeScript Calculator CLI       ║
╚══════════════════════════════════════╝
Type 'help' for commands, 'exit' to quit
`);
    }
    /**
     * Prints help message
     */
    printHelp() {
        console.log(`
Available Commands:
  Expressions:
    5 + 3          - Simple arithmetic (two operands)
    2 * 3 + 4      - Full expression evaluation

  Chain Operations (uses current value):
    add <n>        - Add number to current value
    subtract <n>   - Subtract number from current value
    multiply <n>   - Multiply current value by number
    divide <n>     - Divide current value by number
    power <n>      - Raise current value to power
    sqrt           - Square root of current value
    set <n>        - Set current value directly
    value          - Show current value

  Utility:
    history        - Show calculation history
    clear          - Clear current value (keep history)
    reset          - Reset calculator completely
    help           - Show this help
    exit / quit    - Exit calculator

  Aliases:
    +, -, *, /, ^  - Short aliases for operations
    sub, mul, div, pow - Short aliases
`);
    }
    /**
     * Prints calculation history
     */
    printHistory() {
        const history = this.calculator.calculationHistory;
        if (history.length === 0) {
            console.log('No calculations in history');
            return;
        }
        console.log('\nCalculation History:');
        console.log('─'.repeat(60));
        history.forEach((calc, index) => {
            const time = calc.timestamp.toLocaleTimeString();
            let expr = '';
            if (calc.expression) {
                expr = calc.expression;
            }
            else if (calc.rightOperand !== undefined) {
                expr = `${calc.leftOperand} ${this.getOpSymbol(calc.operation)} ${calc.rightOperand}`;
            }
            else {
                expr = `${calc.operation}(${calc.leftOperand})`;
            }
            console.log(`${index + 1}. [${time}] ${expr} = ${calc.result}`);
        });
        console.log('─'.repeat(60));
    }
    /**
     * Gets operator symbol from operation name
     */
    getOpSymbol(operation) {
        const symbols = {
            add: '+',
            subtract: '-',
            multiply: '*',
            divide: '/',
            power: '^',
            sqrt: '√',
            evaluate: '=',
        };
        return symbols[operation] || operation;
    }
    /**
     * Exits the calculator
     */
    exit() {
        console.log('\nGoodbye!');
        this.rl.close();
        process.exit(0);
    }
}
exports.CalculatorCLI = CalculatorCLI;
/**
 * Runs the calculator in non-interactive mode with command line arguments
 */
function runNonInteractive(args) {
    const calculator = new calculator_js_1.Calculator();
    if (args.length === 0) {
        console.log('Usage: calculator <expression> or calculator <command> <number>');
        process.exit(1);
    }
    try {
        // Try simple expression
        if (args.length === 1) {
            const result = calculator.evaluate(args[0]);
            console.log(result);
            return;
        }
        // Try "number operator number"
        if (args.length === 3) {
            const left = parseFloat(args[0]);
            const operator = args[1];
            const right = parseFloat(args[2]);
            if (isNaN(left) || isNaN(right)) {
                throw new Error('Invalid numbers');
            }
            const result = (0, calculator_js_1.calculate)(left, operator, right);
            console.log(result);
            return;
        }
        // Command mode
        const command = args[0].toLowerCase();
        const num = parseFloat(args[1]);
        if (isNaN(num)) {
            throw new Error('Invalid number');
        }
        switch (command) {
            case 'add':
                calculator.add(num);
                break;
            case 'subtract':
                calculator.subtract(num);
                break;
            case 'multiply':
                calculator.multiply(num);
                break;
            case 'divide':
                calculator.divide(num);
                break;
            case 'power':
                calculator.power(num);
                break;
            case 'sqrt':
                calculator.sqrt();
                break;
            default:
                throw new Error(`Unknown command: ${command}`);
        }
        console.log(calculator.value);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
//# sourceMappingURL=cli.js.map