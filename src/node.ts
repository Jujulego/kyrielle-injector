import type { Scope, Token } from './defs/index.js';
import { globalScope$ } from './global-scope.js';

export * from './defs/index.js';
export * from './async-scope.js';
export * from './global-scope.js';
export * from './scope.js';
export * from './token.js';


/**
 * Creates an instance of token, using and storing in scope.
 *
 * @version 1.0.0
 */
export function inject$<T>(token: Token<T>, scope: Scope = globalScope$()): T {
  console.log('node!');
  let value = scope.get(token);

  if (value === undefined) {
    if (typeof token === 'function') {
      value = new token();
    } else {
      value = token.inject(scope);
    }

    scope.set(token, value);
  }

  return value;
}
