import { IEntity } from '../core/entity/IEntity';
import { ProductMarket } from './ProductMarket';
import { ProductType, ProductTypes } from './ProductType';

export interface IProduct extends IEntity {
  name: string;
  description: string;
  coins: number;
  isActive: boolean;
  amount: number;
  market: ProductMarket;
  type: ProductType;
  promoAmount?: number;
  uuid: string;
}

export const isPromoProduct = (product: IProduct) => product.type === ProductTypes.PROMO;
