import type { SymbolToken } from '@/src/defs/token.js';
import { globalScope$ } from '@/src/global-scope.js';
import { rootScope$ } from '@/src/root-scope.js';
import { expect, it } from 'vitest';

it('should return stored value', () => {
  const token = Symbol('test-token') as SymbolToken<number>;
  const scope = rootScope$('test');

  scope.set(token, 42);
  expect(scope.get(token)).toBe(42);
});

it('should return undefined if cleared', () => {
  const token = Symbol('test-token') as SymbolToken<number>;
  const scope = rootScope$('test');

  scope.set(token, 42);
  scope.clear();

  expect(scope.get(token)).toBeUndefined();
});

it('should not inherit from globalScope$', () => {
  const token = Symbol('test-token') as SymbolToken<number>;
  const scope = rootScope$('test');

  globalScope$().set(token, 42);

  expect(scope.get(token)).toBeUndefined();
});
