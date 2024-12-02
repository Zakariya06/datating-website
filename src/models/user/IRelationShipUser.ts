import { RelationType } from './IRelation';
import { IUser } from './IUser';

export interface IRelationShipUser {
  relationshipType: RelationType;
  createdAt: Date;
  updatedAt: string;
  user: IUser;
  isMatch: boolean;
  isProfileVisited: boolean;
  isNew: boolean;
  relatedUser: IUser;
}
