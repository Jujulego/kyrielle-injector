import type { Scope } from './defs/index.js';
import type { InjectionContext } from './internals/InjectionContext.js';

/** @internal */
export function createRunIn$(context: InjectionContext) {
  return function runIn$<T>(scope: Scope, fn: () => T): T {
    return context.runInScope(scope, fn);
  };
}