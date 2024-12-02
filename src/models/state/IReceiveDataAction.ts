import { IBaseAction } from './IBaseAction';

/**
 *
 *
 * @export
 * @interface IReceiveDataActionPayload
 * @template R Result
 * @template P Params
 */
export interface IReceiveDataActionPayload<R, P> {
  params: P;
  result: R;
}

/**
 *
 *
 * @export
 * @interface IReceiveDataAction
 * @extends {IBaseAction<T, IReceiveDataActionPayload<R, P>, M>}
 * @template T Type
 * @template R Result
 * @template P Params
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IReceiveDataAction<T = string, R = {}, P = any> = IBaseAction<T, IReceiveDataActionPayload<R, P>>;
