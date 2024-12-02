import { shallowEqual, useSelector } from 'react-redux';

import { IState } from '../models/state';
import { getToken, getUser } from '../selectors/AuthenticationSelectors';

export function useUserAndToken() {
    return useSelector(
        (state: IState) => ({
            user: getUser(state),
            token: getToken(state),
        }),
        shallowEqual
    );
}

export default useUserAndToken;
