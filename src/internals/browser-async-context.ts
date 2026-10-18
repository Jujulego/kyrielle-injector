import { globalScope$ } from '../global-scope.js';
import type { AsyncContext } from '../defs/async-context.js';
import type { Scope } from '../defs/index.js';

export class BrowserAsyncContext implements AsyncContext {
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
        throw new Error('Async tokens are not supported in browsers');
      }

      return result;
    } finally {
      this._scope = oldScope;
    }
  }
}