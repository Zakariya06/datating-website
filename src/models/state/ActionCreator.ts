import { IAsyncAction, ICallAPI, IShouldCallAPI } from './IAsyncAction';
import { IBaseAction } from './IBaseAction';

export class ActionCreator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static createAction<T = string, P = any | undefined, A extends IBaseAction<T, P> = IBaseAction<T, P>>(
        type: T,
        payload?: P
    ): A {
        return {
            type: type,
            payload: payload,
        } as A;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static createAsyncAction<RequestData = string, ReceivedData = string, FailedAction = string, P = any>(
        type: string,
        types: [RequestData, ReceivedData, FailedAction],
        callAPI: ICallAPI,
        shouldCallAPI: IShouldCallAPI = () => true,
        payload?: P,
        showBusyIndicator?: boolean
    ): IAsyncAction<RequestData, ReceivedData, FailedAction, P> {
        return {
            type: type,
            types: types,
            shouldCallAPI: shouldCallAPI,
            callAPI: callAPI,
            payload: payload,
            showBusyIndicator: showBusyIndicator,
        } as IAsyncAction<RequestData, ReceivedData, FailedAction, P>;
    }
}

export default ActionCreator;
