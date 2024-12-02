import { IBlockedUser } from './../models/user/blocked_user/IBlockedUser';
import { LikeAction, LikeActions } from '../actions/LikesActionCreator';
import { IPaginatedCollection, emptyPaginatedCollection } from '../models/collections/IPaginatedCollection';
import { IStrangerUserPreview } from '../models/user/IStrangerUser/IStrangerUserPreview';
import { BerndMapper } from '../temp/BerndMapper';

// import { IRelationShipUser } from '../models/user/IRelationShipUser';

export interface ILikesState {
    likes: IPaginatedCollection<IStrangerUserPreview>;
    visitors: IPaginatedCollection<IStrangerUserPreview>;
    matches: IPaginatedCollection<IStrangerUserPreview>;
    blockedUsers: IPaginatedCollection<IBlockedUser>;
}

const LikesDefault: ILikesState = {
    likes: emptyPaginatedCollection(),
    visitors: emptyPaginatedCollection(),
    matches: emptyPaginatedCollection(),
    blockedUsers: emptyPaginatedCollection(),
};

export function LikesReducer(state: ILikesState = LikesDefault, action: LikeAction): ILikesState {
    switch (action.type) {
        case LikeActions.FETCH_LIKES_RESPONSE: {
            const { params, result: collection } = action.payload;

            const result = BerndMapper.mapToPaginatedCollection<IStrangerUserPreview>(collection.Users);
            const newVisits = collection.NewLikes;
            result.new = newVisits;

            return {
                ...state,
                likes: params.isNext
                    ? { ...result, new: newVisits, _embedded: { items: [...state.likes._embedded.items, ...result._embedded.items] } }
                    : result,
            };
        }
        case LikeActions.FETCH_VISITORS_RESPONSE: {
            const { params, result: collection } = action.payload;

            const result = BerndMapper.mapToPaginatedCollection<IStrangerUserPreview>(collection.Users);
            const newVisits = collection.NewVisits;
            result.new = newVisits;

            return {
                ...state,
                visitors: params.isNext
                    ? {
                          ...result,
                          new: newVisits,
                          _embedded: { items: [...state.visitors._embedded.items, ...result._embedded.items] },
                      }
                    : result,
            };
        }
        case LikeActions.FETCH_MATCHES_RESPONSE: {
            const { params, result: collection } = action.payload;

            const result = BerndMapper.mapToPaginatedCollection<IStrangerUserPreview>(collection);
            return {
                ...state,
                matches: params.isNext ? { ...result, _embedded: { items: [...state.matches._embedded.items, ...result._embedded.items] } } : result,
            };
        }
        case LikeActions.FETCH_BLOCKED_USERS_RESPONSE: {
            const { result: collection } = action.payload;
            const result = BerndMapper.mapToPaginatedCollection<IBlockedUser>(collection);
            return {
                ...state,
                blockedUsers: result,
            };
        }
        case LikeActions.FETCH_BLOCKED_USERS_FAILURE: {
            return {
                ...state,
                blockedUsers: emptyPaginatedCollection(),
            };
        }
        case LikeActions.BLOCK_USER_RESPONSE: {
            const { profilId, userName, profilePicture } = action.payload.params;
            const newBlockedUser: IBlockedUser = {
                Profilid: profilId,
                Username: userName,
                Image: profilePicture,
                Birthday: '',
            };
            return {
                ...state,
                blockedUsers: {
                    ...state.blockedUsers,
                    _embedded: { ...state.blockedUsers._embedded, items: [...state.blockedUsers._embedded.items, newBlockedUser] },
                },
            };
        }
        case LikeActions.UNBLOCK_USER_RESPONSE: {
            const { profilId } = action.payload.params;
            return {
                ...state,
                blockedUsers: {
                    ...state.blockedUsers,
                    _embedded: {
                        ...state.blockedUsers._embedded,
                        items: state.blockedUsers._embedded.items.filter((x) => x.Profilid !== profilId),
                    },
                },
            };
        }
        case LikeActions.UNLOCK_USER_RESPONSE: {
            const { art } = action.payload.params;

            const [strangerUser] = action.payload.result;

            if (art === 1) {
                return {
                    ...state,
                    likes: {
                        ...state.likes,
                        _embedded: {
                            items: state.likes._embedded.items.map((x) =>
                                x.Profilid === strangerUser.Profilid
                                    ? {
                                          ...x,
                                          ProfilPicture: strangerUser.Picture,
                                          Picture: strangerUser.Picture,
                                          Unlocked: true,
                                      }
                                    : x
                            ),
                        },
                    },
                };
            } else {
                return {
                    ...state,
                    visitors: {
                        ...state.visitors,
                        _embedded: {
                            items: state.visitors._embedded.items.map((x) =>
                                x.Profilid === strangerUser.Profilid
                                    ? {
                                          ...x,
                                          ProfilPicture: strangerUser.Picture,
                                          Picture: strangerUser.Picture,
                                          Unlocked: true,
                                      }
                                    : x
                            ),
                        },
                    },
                };
            }
        }
        default:
            return state;
    }
}

export default LikesReducer;
