import type { Scope, Token } from './defs/index.js';
import { globalScope$ } from './global-scope.js';

/**
 * Creates an instance of token, using & storing in scope.
 */
export function inject$<T>(token: Token<T>, scope: Scope = globalScope$()): T {
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