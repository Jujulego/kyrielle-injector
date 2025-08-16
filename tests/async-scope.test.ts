import { asyncScope$ } from '@/src/async-scope.js';
import type { SymbolToken } from '@/src/defs/index.js';
import { globalScope$ } from '@/src/global-scope.js';
import { scope$ } from '@/src/scope.js';
import { afterEach, describe, expect, it } from 'vitest';

// Setup
afterEach(() => {
  globalScope$().clear();
});

// Tests
describe('asyncScope$', () => {
  it('should search in the global scope by default', () => {
    const token = Symbol('test-token') as SymbolToken<number>;
    globalScope$().set(token, 42);

    expect(asyncScope$().get(token)).toBe(42);

    asyncScope$(() => {
      expect(asyncScope$().get(token)).toBe(42);
    });
  });

  it('should search in parent scope', () => {
    const token = Symbol('test-token') as SymbolToken<number>;
    const scope = scope$('test-scope');

    scope.set(token, 42);

    expect(asyncScope$(scope).get(token)).toBe(42);
  });

  it('should search in provided async scope', () => {
    const token = Symbol('test-token') as SymbolToken<number>;
    const scope = scope$('test-scope');

    scope.set(token, 42);

    asyncScope$(() => {
      expect(asyncScope$().get(token)).toBe(42);
    }, scope);

    expect(asyncScope$().get(token)).toBeUndefined();
  });
});
