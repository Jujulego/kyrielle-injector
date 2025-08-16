import { AsyncLocalStorage } from 'node:async_hooks';
import type { ChildScope, RootScope, Scope } from './defs/index.js';
import { globalScope$ } from './global-scope.js';
import { scope$ } from './scope.js';

const storage = new AsyncLocalStorage<Scope>();

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

export function asyncScope$<R>(arg1?: (() => R) | Scope, arg2?: Scope) {
  if (typeof arg1 === 'function') {
    const scope = arg2 ?? scope$('async');
    return storage.run(scope, arg1);
  } else {
    return storage.getStore() ?? arg1 ?? globalScope$();
  }
}
