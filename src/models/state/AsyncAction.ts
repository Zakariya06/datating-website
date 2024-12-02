import { IAsyncAction, ICallAPI, IShouldCallAPI } from './IAsyncAction';

export class AsyncAction implements IAsyncAction {
  public types: [string, string, string];
  public callAPI: ICallAPI;
  public shouldCallAPI: IShouldCallAPI;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public payload: undefined | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public type: any;

  constructor(
    type: string,
    types: [string, string, string],
    callAPI: ICallAPI,
    schouldCallAPI: IShouldCallAPI,
    payloadProperty?: object
  ) {
    this.type = type;
    this.types = types;
    this.callAPI = callAPI;
    this.shouldCallAPI = schouldCallAPI;
    this.payload = { ...payloadProperty };
  }
}

export default AsyncAction;
