import { Injectable, type Scope, type Token } from './defs/index.js';

/**
 * Creates an injectable token, using init as instance creator.
 */
export function token$<T>(name: string, init: TokenInitCallback<T>): Token<T> & Injectable<T> {
  const token = Symbol(name) as Token<T>;

  return Object.assign(token, {
    inject(scope: Scope) {
      let value = scope.get(token);

      if (value === undefined) {
        value = init(scope);
        scope.set(token, value);
      }

      return value;
    }
  });
}

export type TokenInitCallback<out T> = (scope: Scope) => T;