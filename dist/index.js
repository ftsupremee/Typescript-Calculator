"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_js_1 = require("./cli.js");
/**
 * Main entry point for the calculator application
 */
function main() {
    const args = process.argv.slice(2);
    if (args.length > 0 && (args[0] === '--help' || args[0] === '-h')) {
        printUsage();
        return;
    }
    if (args.length > 0) {
        // Non-interactive mode
        (0, cli_js_1.runNonInteractive)(args);
    }
    else {
        // Interactive mode
        const cli = new cli_js_1.CalculatorCLI();
        cli.start();
    }
}
/**
 * Prints usage information
 */
function printUsage() {
    console.log(`
TypeScript Calculator - A simple calculator CLI

Usage:
  calculator                    Start interactive mode
  calculator <expression>       Evaluate expression and exit
  calculator <num> <op> <num>   Calculate two operands
  calculator <command> <num>    Run command on number

Examples:
  calculator "2 + 3 * 4"
  calculator 5 + 3
  calculator add 10
  calculator multiply 5

Interactive Commands:
  add, subtract, multiply, divide, power, sqrt, set, value
  history, clear, reset, help, exit

Options:
  -h, --help    Show this help message
`);
}
main();
//# sourceMappingURL=index.js.map