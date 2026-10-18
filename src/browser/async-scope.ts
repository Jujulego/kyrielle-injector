import type { ChildScope, RootScope, Scope } from '../defs/index.js';

/**
 * Uses current {@link ChildScope} stored in {@link AsyncLocalStorage}. Uses {@link globalScope$} as default scope.
 *
 * Works only on Node.Js, not in browser.
 *
 * @version 1.1.0
 */
export function asyncScope$(): Scope;

/**
 * Uses current {@link ChildScope} stored in {@link AsyncLocalStorage}.
 *
 * Works only on Node.Js, not in browser.
 *
 * @param defaultScope Scope used if {@link AsyncLocalStorage} is empty
 *
 * @version 1.1.0
 */
export function asyncScope$<D extends RootScope>(defaultScope: D): ChildScope | D;

/**
 * Creates a new {@link ChildScope} stored in {@link AsyncLocalStorage}. It will be accessible inside given callback.
 *
 * Works only on Node.Js, not in browser.
 *
 * @param fn
 * @param scope Scope to store in the {@link AsyncLocalStorage}.
 *
 * @version 1.1.0
 */
export function asyncScope$<R>(fn: () => R, scope?: Scope): R;

export function asyncScope$(): Scope {
  throw new Error('asyncScope$ is not yet supported in browser');
}
