import type { Scope } from './scope.js';

/**
 * Object that can be injected.
 */
export interface Injectable<out T = unknown> {
  /**
   * Create a new instance of objet, and store it in a scope.
   * @param scope Scope used to store instance, defaults to global scope.
   */
  inject(scope?: Scope): T;
}

/**
 * Object that can be asynchronously injected.
 */
export interface AsyncInjectable<out T = unknown> extends Injectable<PromiseLike<T>> {}

/**
 * Extract value type from an Injectable type
 */
export type InjectedValue<R extends Injectable> = R extends Injectable<infer D> ? D : never;