export interface IUserAttributeUpdateItem {
    id: number;
    category: string;
    attribute: { id: number; value: string };
}
export interface IUpdateUser {
    /**
     * triggers email activiation flow
     *
     * @type {string}
     * @memberof IUpdateUser
     */
    email?: string;
    password?: string;
    id: string;
    userName: string;
    dateOfBirth?: string;
    //   description?: string;
    city: string;
    postalCode: string;
    //   isSmoker?: boolean;
    //   isTattooed?: boolean;
    //   isInRelationship?: boolean;
    gender?: number;
    height?: number;
    // eyeColor?: number;
    starsign?: number;
    //   jobTitle?: string;
    // preferredGender?: number;
    preferredMinAge?: number;
    preferredMaxAge?: number;
    preferredMaxDistance?: number;
    pushPreference?: {
        receivesChatMessagePush: boolean;
        receivesMatchPush: boolean;
        receivesProfileViewPush: boolean;
        receivesLikePush: boolean;
        receivesPresentPush: boolean;
    };

    relationship?: number | null;
    hair?: number | null;
    eyes?: number | null;
    // bodysize: number;
    preferredGender?: number | null;
    living?: number | null;
    bodyjewelry?: number | null;
    smoker?: number | null;

    //   userAttributes?: IUserAttributeUpdateItem[];
}
