export interface IEntity {
  /**
   * the unique identifier of this entity
   *
   * @type {string}
   * @memberof IEntity
   */
  id: string;
  /**
   * created at TimeStamp as ISO8601 string
   *
   * @type {string}
   * @memberof IEntity
   */
  createdAt: string;
  /**
   * Last Updated TimeStamp as ISO8601 string
   *
   * @type {string}
   * @memberof IEntity
   */
  updatedAt: string;
}
