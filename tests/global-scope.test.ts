import { describe, expect, it } from 'vitest';

import { Token } from '@/src/defs/token.js';
import { globalScope$ } from '@/src/global-scope.js';

// Tests
describe('globalScope$', () => {
  it('should return stored value', () => {
    const token: Token<number> = Symbol('test-token');
    const scope = globalScope$();

    scope.set(token, 42);
    expect(scope.get(token)).toBe(42);
    expect(globalScope$().get(token)).toBe(42);
  });

  it('should return undefined if cleared', () => {
    const token: Token<number> = Symbol('test-token');
    const scope = globalScope$();

    scope.set(token, 42);
    scope.clear();

    expect(scope.get(token)).toBeUndefined();
  });
});
