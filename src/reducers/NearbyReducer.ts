import { IStrangerUserPreview } from './../models/user/IStrangerUser/IStrangerUserPreview';
import { BerndMapper } from './../temp/BerndMapper';
import { NearbyAction, NearbyActions } from '../actions/NearbyActionCreator';
import { IPaginatedCollection, emptyPaginatedCollection } from '../models/collections/IPaginatedCollection';
import { IUser } from '../models/user/IUser';

export interface INearbyState {
    users: IPaginatedCollection<IStrangerUserPreview>;
    searchedUsers: IPaginatedCollection<IUser>;
}

const NearbyDefault: INearbyState = {
    users: emptyPaginatedCollection(),
    searchedUsers: emptyPaginatedCollection(),
};

export function NearbyReducer(state: INearbyState = NearbyDefault, action: NearbyAction): INearbyState {
    switch (action.type) {
        case NearbyActions.FETCH_USERS_RESPONSE: {
            const { result, params } = action.payload;

            const collection = BerndMapper.mapToPaginatedCollection(params.isNext ? [...state.users._embedded.items, ...result] : result);

            return {
                ...state,
                users: collection,
            };
        }

        case NearbyActions.LIKE_STRANGER_USER: {
            const { userId } = action.payload;
            return {
                ...state,
                users: {
                    ...state.users,
                    _embedded: {
                        ...state.users._embedded,
                        items: state.users._embedded.items.map<IStrangerUserPreview>((x) => (x.Profilid === userId ? { ...x, IsLiked: true } : x)),
                    },
                },
            };
        }
        // case NearbyActions.SEARCH_USERS_RESPONSE: {
        //     const { params, result } = action.payload;

        //     return {
        //         ...state,
        //         searchedUsers: params.isNext
        //             ? { ...result, _embedded: { items: [...state.users._embedded.items, ...result._embedded.items] } }
        //             : result,
        //     };
        // }
        default:
            return state;
    }
}

export default NearbyReducer;
