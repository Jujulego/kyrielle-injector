import type { Scope } from './scope.js';

export interface AsyncContext {
  /**
   * Returns the current scope.
   */
  getScope(): Scope;

  /**
   * Wraps the given function in the given scope. Any {@link getScope} call made within the function will return the given scope.
   */
  wrapInScope<A extends unknown[], T>(scope: Scope, fn: (...args: A) => T): (...args: A) => T;
}