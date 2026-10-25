import type { Scope } from '@/src/defs/index.js';
import { BrowserContext } from '@/src/internals/BrowserContext.js';
import { NodeContext } from '@/src/internals/NodeContext.js';
import { UnsupportedAsyncToken } from '@/src/internals/UnsupportedAsyncToken.js';
import { describe, expect, it, vi } from 'vitest';

const mockScope: Scope = {
  name: 'test',
  get: vi.fn(),
  set: vi.fn(),
  clear: vi.fn()
};

describe.each([
  { name: BrowserContext.name, context: new BrowserContext(), asyncSupport: false },
  { name: NodeContext.name, context: new NodeContext(), asyncSupport: true }
])('$name', ({ context, asyncSupport }) => {
  it('should give a root scope when running out of any scope', () => {
    expect(context.getScope()).not.toHaveProperty('parent');
  });

  it('should give the given current scope (synchronous tokens)', () => {
    context.runInScope(mockScope, () => {
      expect(context.getScope()).toBe(mockScope);
    });

    expect(context.getScope()).not.toBe(mockScope);
  });

  it.runIf(asyncSupport)('should give the given current scope (asynchronous tokens)', async () => {
    await context.runInScope(mockScope, async () => {
      expect(context.getScope()).toBe(mockScope);
      await Promise.resolve();
      expect(context.getScope()).toBe(mockScope);
    });

    expect(context.getScope()).not.toBe(mockScope);
  });

  it.runIf(!asyncSupport)('should throw UnsupportedAsyncToken', async () => {
    expect(() => context.runInScope(mockScope, () => Promise.resolve()))
      .toThrow(UnsupportedAsyncToken);

    expect(context.getScope()).not.toBe(mockScope);
  });
});