import { scope$ as browserScope$ } from '@/src/browser.js';
import type { SymbolToken } from '@/src/defs/token.js';
import { globalScope$ } from '@/src/global-scope.js';
import { scope$ as nodeScope$ } from '@/src/node.js';
import { afterEach, describe, expect, it } from 'vitest';

// Setup
afterEach(() => {
  globalScope$().clear();
});

// Tests
describe.each([
  { context: 'browser', scope$: browserScope$ },
  { context: 'node', scope$: nodeScope$ }
])('scope$ ($context)', ({ scope$ }) => {
  it('should create a new scope', () => {
    const parent = scope$('parent-scope');
    const scope = scope$('test-scope', parent);

    expect(scope.name).toBe('test-scope');
    expect(scope.parentScope).toBe(parent);
  });

  it('should return stored value', () => {
    const token = Symbol('test-token') as SymbolToken<number>;
    const scope = scope$('test-scope');

    scope.set(token, 42);
    expect(scope.get(token)).toBe(42);
    expect(globalScope$().get(token)).toBeUndefined();
  });

  it('should return value stored parent scope', () => {
    const token = Symbol('test-token') as SymbolToken<number>;

    const parent = scope$('parent-scope');
    const scope = scope$('test-scope', parent);

    parent.set(token, 42);
    expect(scope.get(token)).toBe(42);
  });

  it('should return value stored in global scope', () => {
    const token = Symbol('test-token') as SymbolToken<number>;
    const scope = scope$('test-scope');

    globalScope$().set(token, 42);
    expect(scope.get(token)).toBe(42);
  });

  it('should return undefined if cleared', () => {
    const token = Symbol('test-token') as SymbolToken<number>;
    const scope = scope$('test-scope');

    scope.set(token, 42);
    scope.clear();

    expect(scope.get(token)).toBeUndefined();
  });

  it('should not clear value from parent scope', () => {
    const token = Symbol('test-token') as SymbolToken<number>;

    const parent = scope$('parent-scope');
    const scope = scope$('test-scope', parent);

    parent.set(token, 42);
    scope.set(token, 1);
    scope.clear();

    expect(scope.get(token)).toBe(42);
  });
});
