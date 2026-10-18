import { AsyncLocalStorage } from 'node:async_hooks';
import { globalScope$ } from '../global-scope.js';
import type { InjectionContext } from './InjectionContext.js';
import type { Scope } from '../defs/index.js';

export class NodeContext implements InjectionContext {
  private readonly _storage = new AsyncLocalStorage<Scope>();

  getScope(): Scope {
    return this._storage.getStore() ?? globalScope$();
  }

  runInScope<T>(scope: Scope, fn: () => T): T {
    return this._storage.run(scope, fn);
  }
}