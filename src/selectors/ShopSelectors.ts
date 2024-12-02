import { IState } from '../models/state';

export const getProducts = (state: IState) => state.shop.products;
export const getPresents = (state: IState) => state.shop.presents;
export const getPremiumProducts = (state: IState) => state.shop.premiumProducts
