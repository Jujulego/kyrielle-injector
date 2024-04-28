import type { Injectable } from './injectable.js';

/**
 * Class based token
 */
export type ClassToken<out T = unknown> = new () => T;

/**
 * Symbol based token
 */
export type SymbolToken<T = unknown> = symbol & Injectable<T>;

export type Token<T = unknown> = ClassToken<T> | SymbolToken<T>;