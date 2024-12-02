type Action = import('redux').Action;
export interface IBaseActionBase<Type = string, Meta = undefined> extends Action {
  type: Type;
  error?: boolean;
  meta?: Meta;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IBaseActionWithPayload<Type = string, Payload = any, Meta = undefined>
  extends IBaseActionBase<Type, Meta> {
  payload: Payload;
}

export type IBaseAction<
  Type = string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Payload extends any | undefined = undefined,
  Meta = undefined
> = Payload extends undefined ? IBaseActionBase<Type, Meta> : IBaseActionWithPayload<Type, Payload, Meta>;
