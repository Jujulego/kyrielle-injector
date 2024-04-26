import { Injectable, type Scope, type Token } from './defs/index.js';

/**
 * Creates an injectable token, using init as instance creator.
 */
export function token$<T>(name: string, init: (scope: Scope) => T): Token<T> & Injectable<T> {
  const token = Symbol(name) as Token<T>;

  return Object.assign(token, {
    inject: init
  });
}