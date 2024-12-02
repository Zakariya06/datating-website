import { Action, Dispatch, MiddlewareAPI } from 'redux';

import { Config } from '../config/config';
import { isError } from '../models/core/error/IError';
import { IState, isAsyncAction } from '../models/state';

export const callApiMiddleware = (middlewareAPI: MiddlewareAPI) => (next: Dispatch) => async (action: Action) => {
    const { dispatch, getState } = middlewareAPI;

    // exclude the IAsyncAction from normal actions
    if (!isAsyncAction(action)) {
        // Normal action: pass it on
        return next(action);
    }

    // TODO: Remove action blacklisting when ready to migriate to a good backend
    if (String(action.type).startsWith(Config.BLACKLIST_ACTION_PREFIX)) {
        return;
    }

    const { types, callAPI, shouldCallAPI = (state: IState) => true, payload = {} } = action;

    // check if should call api with current state
    if (!shouldCallAPI(getState())) {
        return;
    }

    // extract action types:
    const [requestType, successType, failureType] = types;

    // dispatch that the request is started
    dispatch({ type: requestType, payload });

    try {
        // fire the Request
        const response = await callAPI(getState());

        const text = await response.text();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let json: string | any = text;

        try {
            json = JSON.parse(text);
        } catch (e) {
            // not a valid json
        }

        // check if the response was successful
        if (response.ok && !isError(json)) {
            return dispatch({
                type: successType,
                payload: {
                    result: json,
                    params: payload,
                    status: response.status,
                },
            });
        } else {
            return dispatch({
                type: failureType,
                payload: {
                    params: payload || {},
                    result: json,
                    status: response.status,
                    statusText: response.statusText,
                },
            });
        }
    } catch (e) {
        return dispatch({
            type: failureType,
            payload: {
                params: payload || {},
            },
        });
    }
};

export default callApiMiddleware;
