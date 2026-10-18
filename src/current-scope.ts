import type { Scope } from './defs/index.js';
import type { InjectionContext } from './internals/InjectionContext.js';

/** @internal */
export function createCurrentScope$(context: InjectionContext) {
  return function currentScope$(): Scope {
    return context.getScope();
  };
}
