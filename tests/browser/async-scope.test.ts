import { asyncScope$ } from '@/src/internals/async-scope.js';
import { globalScope$ } from '@/src/global-scope.js';
import { afterEach, describe, expect, it } from 'vitest';

// Setup
afterEach(() => {
  globalScope$().clear();
});

// Tests
describe('asyncScope$ (browser)', () => {
  it('should throw as browser does not yet support async context', () => {
    expect(() => asyncScope$()).toThrow();
  });
});
