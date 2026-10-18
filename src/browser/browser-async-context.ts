import { globalScope$ } from '../common/global-scope.js';
import type { AsyncContext } from '../defs/async-context.js';
import type { Scope } from '../defs/index.js';

export class BrowserAsyncContext implements AsyncContext {
  private _scope: Scope = globalScope$();

  getScope(): Scope {
    return this._scope;
  }

  wrapInScope<T>(scope: Scope, token: () => T): () => T {
    return () => {
      const oldScope = this._scope;
      this._scope = scope;

      try {
        const result = token();

        if (result instanceof Promise) {
          throw new Error('Async functions are not supported in browsers');
        }

        return result;
      } finally {
        this._scope = oldScope;
      }
    };
  }
}