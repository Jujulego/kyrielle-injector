import type { RootScope } from './defs/index.js';
import { rootScope$ } from './root-scope.js';

// Constants
const GLOBAL_SCOPE = Symbol.for('kyrielle/injector:GLOBAL_SCOPE');

/**
 * Returns the global {@link RootScope}
 *
 * @version 1.0.0
 */
export function globalScope$(): RootScope {
  return (globalThis as { [GLOBAL_SCOPE]?: RootScope })[GLOBAL_SCOPE] ??= rootScope$('[[global]]');
}
