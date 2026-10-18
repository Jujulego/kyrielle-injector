import type { Scope } from '@/src/defs/index.js';
import { BrowserContext } from '@/src/internals/BrowserContext.js';
import { NodeContext } from '@/src/internals/NodeContext.js';
import { UnsupportedAsyncToken } from '@/src/internals/UnsupportedAsyncToken.js';
import { describe, expect, it, vi } from 'vitest';

describe.each([
  { name: BrowserContext.name, context: new BrowserContext(), asyncSupport: false },
  { name: NodeContext.name, context: new NodeContext(), asyncSupport: true }
])('$name', ({ context, asyncSupport }) => {
  it('should give a root scope when running out of any scope', () => {
    expect(context.getScope()).not.toHaveProperty('parent');
  });

  it('should give the given current scope (synchronous tokens)', () => {
    const scope: Scope = {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn()
    };

    context.runInScope(scope, () => {
      expect(context.getScope()).toBe(scope);
    });

    expect(context.getScope()).not.toBe(scope);
  });

  it.runIf(asyncSupport)('should give the given current scope (asynchronous tokens)', async () => {
    const scope: Scope = {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn()
    };

    await context.runInScope(scope, async () => {
      expect(context.getScope()).toBe(scope);
      await Promise.resolve();
      expect(context.getScope()).toBe(scope);
    });

    expect(context.getScope()).not.toBe(scope);
  });

  it.runIf(!asyncSupport)('should throw UnsupportedAsyncToken', async () => {
    const scope: Scope = {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn()
    };

    expect(() => context.runInScope(scope, () => Promise.resolve()))
      .toThrow(UnsupportedAsyncToken);

    expect(context.getScope()).not.toBe(scope);
  });
});