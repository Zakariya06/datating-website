import { OptionsObject } from 'notistack';

export interface INotification {
    key: string;
    message: string;
    options?: OptionsObject;
    dismissed?: boolean;
}
