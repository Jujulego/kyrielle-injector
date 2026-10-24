import type { RootScope, Token } from './defs/index.js';

/**
 * Returns a new {@link RootScope}
 *
 * @version 2.0.0
 */
export function rootScope$(name: string): RootScope {
  let map = new WeakMap<Token, unknown>();

  return {
    name,
    get: <T>(token: Token<T>) => map.get(token) as T,
    set: (token, value) => map.set(token, value),
    clear: () => {
      map = new WeakMap();
    },
  };
}
