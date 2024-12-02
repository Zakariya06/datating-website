import { IBerndChatMessage } from './IBerndChatMessage';

export interface IBerndDialog {
    Profilid: string; // => UserId des Chatpartners
    Picture: string;
    Username: string; // => Name des Chatpartners
    Unread: number; // => Anzahl an ungelesenen Nachrichten?
    Profilage: number;

    LastTyp: number; // => ???
    LastMessage: string; // => Text der letzten nachricht des Chats
    LastMessageFrom: string;
    Date: string; // => Sendedatum der letzten nachricht.

    IsFavorit: boolean;
    Messages?: IBerndChatMessage[];
    Offen?: any;
    IsOnline: boolean;
}
