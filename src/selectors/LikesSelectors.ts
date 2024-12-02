import { IState } from '../models/state';

export const getLikesState = (state: IState) => state.likes;
export const getLikes = (state: IState) => getLikesState(state).likes;
export const getVisitors = (state: IState) => getLikesState(state).visitors;
export const getMatches = (state: IState) => getLikesState(state).matches;
export const getBlockedUsers = (state: IState) => getLikesState(state).blockedUsers;
