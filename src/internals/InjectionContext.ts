import type { Scope } from '../defs/scope.js';

export interface InjectionContext {
  /**
   * Returns the current scope.
   */
  getScope(): Scope;

  /**
   * Runs the given function within the given scope.
   * Any {@link getScope} call made within the function will return the given scope.
   */
  runInScope<T>(scope: Scope, fn: () => T): T;
}