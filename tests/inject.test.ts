import { scope$ as browserScope$, inject$ as browserInject$ } from '@/src/browser.js';
import { scope$ as nodeScope$, inject$ as nodeInject$ } from '@/src/node.js';
import { describe, expect, it, vi } from 'vitest';
import { token$ } from '@/src/token.js';

describe.each([
  { context: 'browser', scope$: browserScope$, inject$: browserInject$ },
  { context: 'node', scope$: nodeScope$, inject$: nodeInject$ }
])('inject$ ($context)', ({ scope$, inject$ }) => {
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