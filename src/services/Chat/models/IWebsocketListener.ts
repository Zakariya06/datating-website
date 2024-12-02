// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IWebsocketListener<T = any> {
    method: string;
    handler(url: string, data: T): void;
}
