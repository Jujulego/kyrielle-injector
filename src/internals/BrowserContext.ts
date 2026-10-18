import type { Scope } from '../defs/index.js';
import type { InjectionContext } from './InjectionContext.js';
import { globalScope$ } from '../global-scope.js';
import { UnsupportedAsyncToken } from './UnsupportedAsyncToken.js';

export class BrowserContext implements InjectionContext {
  private _scope: Scope = globalScope$();

  getScope(): Scope {
    return this._scope;
  }

  runInScope<T>(scope: Scope, fn: () => T): T {
    const oldScope = this._scope;
    this._scope = scope;

    try {
      const result = fn();

      if (result instanceof Promise) {
        throw new UnsupportedAsyncToken('Async tokens are not supported in browsers');
      }

      return result;
    } finally {
      this._scope = oldScope;
    }
  }
}