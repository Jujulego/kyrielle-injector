import type { ChildScope, Scope, Token } from './defs/index.js';
import { globalScope$ } from './global-scope.js';

/**
 * Creates a new ChildScope, with given parent defaulting to global scope
 */
export function scope$(name: string, parent: Scope = globalScope$()): ChildScope {
  const map = new Map<Token, unknown>();

  return {
    name,
    parentScope: parent,
    get<T>(token: Token<T>) {
      let value = map.get(token) as T | undefined;

      if (value === undefined) {
        value = parent.get(token);
      }

      return value;
    },
    set: (token, value) => map.set(token, value),
    clear: () => map.clear(),
  };
}