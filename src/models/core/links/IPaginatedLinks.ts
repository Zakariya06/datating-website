import { ILink } from './ILink';

export interface IPaginatedLinks {
  self: ILink;
  first?: ILink;
  last?: ILink;
  next?: ILink;
}
