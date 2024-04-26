import type { Injectable, Scope } from './defs/index.js';
import { globalScope$ } from './global-scope.js';

/**
 * Creates an instance of injectable, using & storing in scope.
 */
export function inject$<T>(injectable: Injectable<T>, scope: Scope = globalScope$()): T {
  return injectable.inject(scope);
}