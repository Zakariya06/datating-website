import { IBaseAction } from './IBaseAction';

/**
 * Interface for Redux Request Data Actions which is dispatched by
 * Middlewareapi and contained in the IAsyncAction
 *
 * @export
 * @interface IRequestDataAction
 * @extends {IBaseAction<T, P>}
 * @template T Type
 * @template P Payload (payload which is given to AsyncAction)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IRequestDataAction<T = string, P extends any | undefined = undefined> = IBaseAction<T, P>;
