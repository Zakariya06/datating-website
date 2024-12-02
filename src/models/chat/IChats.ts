import isArray from '../../core/typeguards/isArray';
import { IDialog } from './IDialog';

export interface IChats {
    coins: number;
    dialogs: IDialog[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isChatsObject = (x: any): x is IChats => x && 'dialogs' in x && isArray(x.dialogs);
