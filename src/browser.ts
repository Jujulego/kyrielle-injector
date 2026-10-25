import { createCurrentScope$ } from './current-scope.js';
import { createInject$ } from './inject.js';
import { BrowserContext } from './internals/BrowserContext.js';
import { createRunIn$ } from './run-in.js';
import { createScope$ } from './scope.js';

const context = new BrowserContext();

export * from './common.js';

/**
 * Returns current scope.
 *
 * @version 2.0.0
 */
export const currentScope$ = createCurrentScope$(context);

/**
 * Creates an instance of token, using and storing in scope.
 *
 * @version 1.0.0
 */
export const inject$ = createInject$(context);

/**
 * Runs a function in a given scope. Any {@link inject$} calls within the function will use the provided scope by default.
 *
 * @version 2.0.0
 */
export const runIn$ = createRunIn$(context);

/**
 * Creates a new {@link ChildScope}, with a given parent defaulting to current scope
 *
 * @version 1.0.0
 */
export const scope$ = createScope$(context);