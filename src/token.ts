import { type Scope, type SymbolToken } from './defs/index.js';

/**
 * Creates an injectable token, using init as instance creator.
 */
export function token$<T>(name: string, init: TokenInitCallback<T>): SymbolToken<T> {
  return Object.assign(Symbol(name), {
    inject: init,
  });
}

export type TokenInitCallback<out T> = (scope: Scope) => T;