/**
 * CLI interface for the calculator
 */
export declare class CalculatorCLI {
    private calculator;
    private rl;
    constructor();
    /**
     * Starts the interactive calculator session
     */
    start(): void;
    /**
     * Processes a single line of input
     */
    private processInput;
    /**
     * Prints welcome message
     */
    private printWelcome;
    /**
     * Prints help message
     */
    private printHelp;
    /**
     * Prints calculation history
     */
    private printHistory;
    /**
     * Gets operator symbol from operation name
     */
    private getOpSymbol;
    /**
     * Exits the calculator
     */
    private exit;
}
/**
 * Runs the calculator in non-interactive mode with command line arguments
 */
export declare function runNonInteractive(args: string[]): void;
//# sourceMappingURL=cli.d.ts.map