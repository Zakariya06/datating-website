import { AuthenticationAction, AuthenticationActions } from '../actions/AuthenticationActionCreator';
import { ShopAction, ShopActions } from '../actions/ShopActionCreator';
import { IPaginatedCollection, emptyPaginatedCollection } from '../models/collections/IPaginatedCollection';
import { isError } from '../models/core/error/IError';
import { IProduct } from '../models/product/IProduct';
import { BerndMapper } from '../temp/BerndMapper';
import { IBerndPresent } from '../temp/models/IBerndPresent';

export interface IShopState {
    products: IPaginatedCollection<IProduct>;
    presents: IBerndPresent[];
    premiumProducts: any[];
}

const ShopDefault: IShopState = {
    products: emptyPaginatedCollection(),
    presents: [],
    premiumProducts: <any>[],
};

export function ShopReducer(state: IShopState = ShopDefault, action: AuthenticationAction | ShopAction): IShopState {
    switch (action.type) {
        case ShopActions.FETCH_PRODUCTS_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }

            return {
                ...state,
                products: BerndMapper.mapToPaginatedCollection(
                    BerndMapper.filterBerndProducts(action.payload.result).map(BerndMapper.mapBerndProductToProduct)
                ),
            };
        }
        case ShopActions.GET_PRESENTS_RESPONSE: {
            if (isError(action.payload.result)) {
                return state;
            }

            return {
                ...state,
                presents: action.payload.result,
            };
        }
        case ShopActions.FETCH_PREMIUM_PRODUCTS_RESPONSE: {
            // Handle the new action
            if (isError(action.payload.result)) {
                return state;
            }

            return {
                ...state,
                premiumProducts: action.payload.result,
            };
        }
        case AuthenticationActions.LOGOUT: {
            return { ...ShopDefault };
        }
        default: {
            return state;
        }
    }
}

export default ShopReducer;


