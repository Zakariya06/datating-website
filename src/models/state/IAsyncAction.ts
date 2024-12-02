import isArray from '../../core/typeguards/isArray';
import isFunction from '../../core/typeguards/isFunction';
import isNullOrUndefined from '../../core/typeguards/isNullOrUndefined';
import isString from '../../core/typeguards/isString';
import { IAction } from './IAction';
import { IState } from './IState';

type Action = import('redux').Action;

export type ICallAPI = (state?: IState) => Promise<Response>;

export type IShouldCallAPI = (state?: IState) => boolean;

/**
 *
 *
 * @export
 * @interface IAsyncAction
 * @extends {Action}
 * @template RequestData RequestActiontype
 * @template ReceivedData ReceivedActionType
 * @template FailedAction FailedActionType
 * @template P Payload
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IAsyncAction<RequestData = string, ReceivedData = string, FailedAction = string, P = any>
    extends Action {
    types: [RequestData, ReceivedData, FailedAction];
    callAPI: ICallAPI;
    shouldCallAPI: IShouldCallAPI;
    payload?: P;
}

export function isAsyncAction(action: IAction | IAsyncAction): action is IAsyncAction {
    if (!isNullOrUndefined(action) && 'types' in action && 'callAPI' in action) {
        const { types, callAPI } = action;

        if (!types) {
            return false;
        }

        if (!isArray(types) || types.length !== 3 || !types.every(isString)) {
            throw new TypeError('Expected an array of three string types.');
        }
        if (!isFunction(callAPI)) {
            throw new TypeError('Expected callAPI to be a function.');
        }

        return true;
    } else {
        return false;
    }
}
