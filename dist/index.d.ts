import { IOptions, TCallbackParam, TErrorCallbackParam } from "../types";
declare class AsyncQueue {
    private callback;
    private queue;
    options: IOptions;
    private resolve;
    constructor(options?: IOptions);
    run: (key: string) => void;
    add: (key: string, callback: TCallbackParam, errorCallback?: TErrorCallbackParam) => void;
}
export { TCallbackParam, IOptions, TErrorCallbackParam, AsyncQueue };
