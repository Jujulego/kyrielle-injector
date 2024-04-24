import type { RootScope, Token } from './defs/index.js';

// Constants
const GLOBAL_SCOPE_MAP = Symbol.for('kyrielle/injector:GLOBAL_SCOPE_MAP');

/**
 * Returns a new RootScope
 */
export function globalScope$(): RootScope {
  const map = (globalThis as { [GLOBAL_SCOPE_MAP]?: Map<Token, unknown> })[GLOBAL_SCOPE_MAP] ??= new Map();

  return {
    get: <T>(token: Token<T>) => map.get(token) as T,
    set: (token, value) => map.set(token, value),
    clear: () => map.clear(),
  };
}