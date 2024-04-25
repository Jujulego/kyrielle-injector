import type { Token } from './token.js';

/**
 * Root scope, map matching tokens to instances
 */
export interface RootScope {
  /**
   * Return value stored at given token
   */
  get<T>(token: Token<T>): T | undefined;

  /**
   * Update value stored at given token
   */
  set<T>(token: Token<T>, obj: T): void;

  /**
   * Removes all token stored in the current scope
   */
  clear(): void;
}

/**
 * Child scope, map matching tokens to instances, with inheritance.
 */
export interface ChildScope extends RootScope {
  readonly name: string;
  readonly parentScope: Scope;
}

export type Scope = RootScope | ChildScope;