import Config from '../config';
import FetchApi from '../core/fetch/FetchApi';
import generateValidUrl from '../core/fetch/generateValidUrl';
import { HttpMethods } from '../core/fetch/HttpMethod';
import { ActionCreator, IReceiveDataAction, IRequestDataAction, IRequestDataFailedAction, IState } from '../models/state';
import { getUserAndToken } from '../selectors/AuthenticationSelectors';
import formatRequestBody from '../temp/formatRequestBody';
import { IBerndPresent } from '../temp/models/IBerndPresent';
import { IBerndProduct } from '../temp/models/IBerndProduct';


export enum ShopActions {
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
    FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
    FETCH_PRODUCTS_RESPONSE = 'FETCH_PRODUCTS_RESPONSE',
    FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',

    GET_PRESENTS = 'GET_PRESENTS',
    GET_PRESENTS_REQUEST = 'GET_PRESENTS_REQUEST',
    GET_PRESENTS_RESPONSE = 'GET_PRESENTS_RESPONSE',
    GET_PRESENTS_FAILURE = 'GET_PRESENTS_FAILURE',

    FETCH_PREMIUM_PRODUCTS = 'FETCH_PREMIUM_PRODUCTS',
    FETCH_PREMIUM_PRODUCTS_REQUEST = 'FETCH_PREMIUM_PRODUCTS_REQUEST',
    FETCH_PREMIUM_PRODUCTS_RESPONSE = 'FETCH_PREMIUM_PRODUCTS_RESPONSE',
    FETCH_PREMIUM_PRODUCTS_FAILURE = 'FETCH_PREMIUM_PRODUCTS_FAILURE',
}


type IFetchProductsRequest = IRequestDataAction<ShopActions.FETCH_PRODUCTS_REQUEST>;
type IFetchProductsResponse = IReceiveDataAction<ShopActions.FETCH_PRODUCTS_RESPONSE, IBerndProduct[]>;
type IFetchProductsFailure = IRequestDataFailedAction<ShopActions.FETCH_PRODUCTS_FAILURE>;
type FetchProducts = IFetchProductsRequest | IFetchProductsResponse | IFetchProductsFailure;

type IGetPresentsRequest = IRequestDataAction<ShopActions.GET_PRESENTS_REQUEST>;
type IGetPresentsResponse = IReceiveDataAction<ShopActions.GET_PRESENTS_RESPONSE, IBerndPresent[]>;
type IGetPresentsFailure = IRequestDataFailedAction<ShopActions.GET_PRESENTS_FAILURE>;
type GetPresents = IGetPresentsRequest | IGetPresentsResponse | IGetPresentsFailure;

type IFetchPremiumProductsRequest = IRequestDataAction<ShopActions.FETCH_PREMIUM_PRODUCTS_REQUEST>;
type IFetchPremiumProductsResponse = IReceiveDataAction<ShopActions.FETCH_PREMIUM_PRODUCTS_RESPONSE, IBerndProduct[]>;
type IFetchPremiumProductsFailure = IRequestDataFailedAction<ShopActions.FETCH_PREMIUM_PRODUCTS_FAILURE>;
type FetchPremiumProducts = IFetchPremiumProductsRequest | IFetchPremiumProductsResponse | IFetchPremiumProductsFailure;


export type ShopAction = FetchProducts | GetPresents | FetchPremiumProducts;


export class ShopActionCreator {
    public static getPresents() {
        const url = generateValidUrl(Config.BASE_URL);

        return ActionCreator.createAsyncAction(
            ShopActions.GET_PRESENTS,
            [ShopActions.GET_PRESENTS_REQUEST, ShopActions.GET_PRESENTS_RESPONSE, ShopActions.GET_PRESENTS_FAILURE],
            (state: IState) => {
                const { token, user } = getUserAndToken(state);
                return FetchApi.fetch(url, formatRequestBody(Config.GET_PRESENTS_URL, user?.Userid, {}), HttpMethods.POST, token, user);
            }
        );
    }

    public static fetchProducts() {
        const url = generateValidUrl(Config.GET_PRODUCT_URL);

        return ActionCreator.createAsyncAction(
            ShopActions.FETCH_PRODUCTS,
            [ShopActions.FETCH_PRODUCTS_REQUEST, ShopActions.FETCH_PRODUCTS_RESPONSE, ShopActions.FETCH_PRODUCTS_FAILURE],
            (state: IState) => {
                const { token, user } = getUserAndToken(state);

                return FetchApi.fetch(url, formatRequestBody(Config.GET_PRODUCT_URL, user?.Userid, {}), HttpMethods.GET, token, user);
            }
        );
    }

    public static fetchPremiumProduct() {
        const url = generateValidUrl(Config.GET_PRODUCT_URL);

        return ActionCreator.createAsyncAction(
            ShopActions.FETCH_PREMIUM_PRODUCTS,
            [ShopActions.FETCH_PREMIUM_PRODUCTS_REQUEST, ShopActions.FETCH_PREMIUM_PRODUCTS_RESPONSE, ShopActions.FETCH_PREMIUM_PRODUCTS_FAILURE],
            (state: IState) => {
                const { token, user } = getUserAndToken(state);

                return FetchApi.fetch(url, formatRequestBody(Config.GET_PRODUCT_URL, user?.Userid, {}), HttpMethods.GET, token, user);
            }
        );
    }
}

export default ShopActionCreator;





