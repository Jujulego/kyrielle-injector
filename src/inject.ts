import type { InjectionContext } from './defs/injection-context.js';
import type { Scope, Token } from './defs/index.js';

/** @internal */
export function createInject$(context: InjectionContext) {
  return function inject$<T>(token: Token<T>, scope: Scope = context.getScope()): T {
    let value = scope.get(token);

    if (value === undefined) {
      if (typeof token === 'function') {
        value = context.runInScope(scope, () => new token());
      } else {
        value = context.runInScope(scope, () => token.inject(scope));
      }

      scope.set(token, value);
    }

    return value;
  };
}