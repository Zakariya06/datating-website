import { IState } from '../models/state';

export const getNearbyState = (state: IState) => state.nearby;
export const getNearbyUsers = (state: IState) => state.nearby.users;
export const getSearchedUsers = (state: IState) => state.nearby.searchedUsers;
