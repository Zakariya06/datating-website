export const PushTypMap = {
    explorer: 'explorer',
    match: 'match',
    visit: 'visit',
    like: 'like',
    message: 'message',
    support: 'support'
};

export interface IFeed {
    PushId: number;
    Date: string;
    ProfilPicture: string;
    ProfilUsername: string;
    Profilid: string;
    Text: string;
    Title: string;
    Pushtyp: string;
    Unlocked: boolean;
}
