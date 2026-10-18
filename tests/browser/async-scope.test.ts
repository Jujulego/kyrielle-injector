import { asyncScope$ } from '@/src/browser/async-scope.js';
import { globalScope$ } from '@/src/common/global-scope.js';
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
