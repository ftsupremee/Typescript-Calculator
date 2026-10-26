import { CalculatorCLI, runNonInteractive } from './cli.js';

/**
 * Main entry point for the calculator application
 */
function main(): void {
  const args = process.argv.slice(2);

  if (args.length > 0 && (args[0] === '--help' || args[0] === '-h')) {
    printUsage();
    return;
  }

  if (args.length > 0) {
    // Non-interactive mode
    runNonInteractive(args);
  } else {
    // Interactive mode
    const cli = new CalculatorCLI();
    cli.start();
  }
}

/**
 * Prints usage information
 */
function printUsage(): void {
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