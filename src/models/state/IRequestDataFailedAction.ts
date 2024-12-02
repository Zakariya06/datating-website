import { IError } from '../core/error/IError';
import { IBaseAction } from './IBaseAction';

export interface IRequestFailedActionPayload<P> {
    statusCode: string;
    params: P;
    result?: [IError];
}

/**
 *
 *
 * @export
 * @interface IRequestDataFailedAction
 * @extends {IBaseAction<T, IRequestFailedActionPayload>}
 * @template T Type
 * @template P Parameters
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IRequestDataFailedAction<T = string, P = any> = IBaseAction<T, IRequestFailedActionPayload<P>>;
