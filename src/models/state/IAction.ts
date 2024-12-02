import { IAsyncAction } from './IAsyncAction';
import { IBaseAction } from './IBaseAction';

export type IAction = IBaseAction | IAsyncAction | import('redux').AnyAction;
