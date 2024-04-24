/**
 * Symbol used as key by scopes
 */
export type Token<T = unknown> = symbol & { __type?: T };