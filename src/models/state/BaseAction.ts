import { Action } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseAction<T, P = any | undefined> = P extends undefined ? Action<T> : Action<T> & { payload: P };
