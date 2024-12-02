import { IUserAttributeItem } from './IUserAttributeItem';
import { UserAttributeCategory } from './UserAttributeCategory';

export interface IUserAttribute {
  id: number;
  category: UserAttributeCategory;
  attributes: IUserAttributeItem[];
}

export interface IUserSelfAttribute {
  id: number;
  category: UserAttributeCategory;
  attribute: IUserAttributeItem;
}
