import { IEntity } from '../core/entity/IEntity';

export type RelationType = 'like' | 'dislike' | 'profileVisit' | 'match' | 'block';
export enum RelationTypes {
  LIKE = 'like',
  DISLIKE = 'dislike',
  PROFILE_VISIT = 'profileVisit',
  MATCH = 'match',
  BLOCK = 'block',
}

export interface IRelation extends IEntity {
  relationshipType: RelationType;
  isMatch: boolean;
}
