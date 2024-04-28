import { afterEach, describe, expect, it } from 'vitest';

import { SymbolToken } from '@/src/defs/token.js';
import { globalScope$ } from '@/src/global-scope.js';
import { scope$ } from '@/src/scope.js';

// Setup
afterEach(() => {
  globalScope$().clear();
});

// Tests
describe('scope$', () => {
  it('should create a new scope', () => {
    const parent = scope$('parent-scope');
    const scope = scope$('test-scope', parent);

    expect(scope.name).toBe('test-scope');
    expect(scope.parentScope).toBe(parent);
  });

  it('should return stored value', () => {
    const token: SymbolToken<number> = Symbol('test-token');
    const scope = scope$('test-scope');

    scope.set(token, 42);
    expect(scope.get(token)).toBe(42);
    expect(globalScope$().get(token)).toBeUndefined();
  });

  it('should return value stored parent scope', () => {
    const token: SymbolToken<number> = Symbol('test-token');

    const parent = scope$('parent-scope');
    const scope = scope$('test-scope', parent);

    parent.set(token, 42);
    expect(scope.get(token)).toBe(42);
  });

  it('should return value stored global scope', () => {
    const token: SymbolToken<number> = Symbol('test-token');
    const scope = scope$('test-scope');

    globalScope$().set(token, 42);
    expect(scope.get(token)).toBe(42);
  });

  it('should return undefined if cleared', () => {
    const token: SymbolToken<number> = Symbol('test-token');
    const scope = scope$('test-scope');

    scope.set(token, 42);
    scope.clear();

    expect(scope.get(token)).toBeUndefined();
  });

  it('should not clear value from parent scope', () => {
    const token: SymbolToken<number> = Symbol('test-token');

    const parent = scope$('parent-scope');
    const scope = scope$('test-scope', parent);

    parent.set(token, 42);
    scope.set(token, 1);
    scope.clear();

    expect(scope.get(token)).toBe(42);
  });
});
