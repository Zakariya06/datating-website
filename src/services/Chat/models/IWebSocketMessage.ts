export interface IWebSocketMessage<E extends string = string, P = {}> {
  event: E;
  dialog?: string | null;
  payload?: P;
}
