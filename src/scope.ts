import type { AsyncContext } from './defs/async-context.js';
import type { ChildScope, Scope, Token } from './defs/index.js';

/** @internal */
export function createScope$(context: AsyncContext) {
  return function scope$(name: string, parent: Scope = context.getScope()): ChildScope {
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
  };
}