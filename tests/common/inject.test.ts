import { describe, expect, it, vi } from 'vitest';

import { inject$ } from '@/src/inject.js';
import { scope$ } from '@/src/scope.js';
import { token$ } from '@/src/token.js';

// Tests
describe('inject$', () => {
  it('should create an instance of token, using given callback', () => {
    const spy = vi.fn(() => 42);

    const scope = scope$('scope');
    const token = token$('token', spy);

    expect(inject$(token, scope)).toBe(42);
    expect(inject$(token, scope)).toBe(42);

    expect(spy).toHaveBeenCalledWith(scope);
    expect(spy).toHaveBeenCalledOnce();
  });

  it('should create an instance of given class', () => {
    class Test {
      life = 42;
    }

    expect(inject$(Test)).toBeInstanceOf(Test);
    expect(inject$(Test)).toBe(inject$(Test));
  });
});