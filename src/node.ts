import { createInject$ } from './inject.js';
import { NodeContext } from './internals/NodeContext.js';
import { createScope$ } from './scope.js';

const context = new NodeContext();

export * from './common.js';

/**
 * Creates an instance of token, using and storing in scope.
 *
 * @version 1.0.0
 */
export const inject$ = createInject$(context);

/**
 * Creates a new {@link ChildScope}, with a given parent defaulting to current scope
 *
 * @version 1.0.0
 */
export const scope$ = createScope$(context);