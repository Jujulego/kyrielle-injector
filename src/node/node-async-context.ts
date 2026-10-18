import { AsyncLocalStorage } from 'node:async_hooks';
import { globalScope$ } from '../common/global-scope.js';
import type { AsyncContext } from '../defs/async-context.js';
import type { Scope } from '../defs/index.js';

export class NodeAsyncContext implements AsyncContext {
  private readonly _storage = new AsyncLocalStorage<Scope>();

  getScope(): Scope {
    return this._storage.getStore() ?? globalScope$();
  }

  wrapInScope<A extends unknown[], T>(scope: Scope, fn: (...args: A) => T): (...args: A) => T {
    return (...args) => this._storage.run(scope, () => fn(...args));
  }
}