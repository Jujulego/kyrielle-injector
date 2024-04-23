/**
 * Symbol used as key by scopes
 */
export type Token<T> = symbol & { __type?: T };