import { IState } from '../models/state';
import { IUser } from '../models/user/IUser';
import { IAuthenticationState } from '../reducers/AuthenticationReducer';

export const getAuthenticationstate = (state: IState) => state.authentication;

export const getToken = (state: IState): string | undefined => ((authState: IAuthenticationState) => authState.token)(getAuthenticationstate(state));

export const isTokenExpired = (state: IState): boolean | null =>
    ((authState: IAuthenticationState) => (authState.tokenExpiresAt ? new Date(authState.tokenExpiresAt).getTime() < new Date().getTime() : null))(
        getAuthenticationstate(state)
    );

export const getUser = (state: IState): IUser | undefined => ((authState: IAuthenticationState) => authState.user)(getAuthenticationstate(state));

export const getUserAndToken = (state: IState) => ({ user: getUser(state), token: getToken(state) });

export const isAuthenticated = (state: IState) => state.authentication.token && state.authentication.user;

export const getGeoLocation = (state: IState) => state.authentication.geolocation;

export const getUserAttributesFromState = (state: IState) => state.authentication.userAttributes;

export const getOptInStateFromState = (state: IState) => state.authentication.optInResponse;

export const getAuthenticationError = (state: IState) => getAuthenticationstate(state).error;
