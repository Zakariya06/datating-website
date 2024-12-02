export interface IChatPartner {
    id: string;
    name: string;
    username: string;
    age?: number;
    photo: string;
    unread: number;
    isOnline: boolean;
}
