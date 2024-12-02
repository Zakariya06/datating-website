import { IUserAttribute } from './IUserAttribute';

export interface IUserAttributeItem {
  id: number;
  value: string;
}

export const findUserAttributeItemId = (value: string, userAttribute: IUserAttribute): number => {
  return userAttribute.attributes.find((y: IUserAttributeItem) => y.value === value)?.id || 0;
};
