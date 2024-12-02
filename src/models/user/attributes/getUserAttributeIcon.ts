import {
  faChild,
  faGenderless,
  faGlassMartiniAlt,
  faHouse,
  faPalette,
  faSearch,
  faSmoke,
  faUser,
  faWeight,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';
import { UserAttributeCategories } from './UserAttributeCategory';

// Self
export interface IUserSelfAttributesCollection {
  _embedded: {
    items: IUserSelfAttribute[];
  };
}

export interface IUserSelfAttributeItem {
  id: number;
  value: string;
}

export interface IUserSelfAttribute {
  id: number;
  category: string;
  attribute: IUserSelfAttributeItem;
}

// possible attributes

export interface IUserAttributesCollection {
  _embedded: {
    items: IUserAttribute[];
  };
}

export interface IUserAttribute {
  id: number;
  category: string;
  attributes: IUserSelfAttributeItem[];
}

export type IUserAttributes = IUserSelfAttribute[];

export function getUserAttributeIcon(userAttribute: IUserSelfAttribute | IUserAttribute): IconDefinition {
  switch (userAttribute.category) {
    default:
      return faUser;
    case UserAttributeCategories.SHAPE:
      return faWeight;
    case UserAttributeCategories.SMOKER:
      return faSmoke;
    case UserAttributeCategories.ALCOHOL:
      return faGlassMartiniAlt;
    case UserAttributeCategories.LIVING:
      return faHouse;
    case UserAttributeCategories.RELATION:
      return faSearch;
    case UserAttributeCategories.ORIENTATION:
      return faGenderless;
    case UserAttributeCategories.CHILDREN:
      return faChild;
    case UserAttributeCategories.HAIRCOLOR:
      return faPalette;
  }
}
