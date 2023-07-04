import {
    IOptions,
    TCallback,
    TCallbackParam,
    TErrorCallbackParam,
    TQueue
} from "../types";

class AsyncQueue {
    private callback: TCallback = {}
    private queue: TQueue = {}
    options: IOptions = {
        autorun: true,
        maxSizeQueue: 1000,
    }
    private resolve = (key: string) => {
        delete this.callback[key]
        if (this.queue[key].length) {
            this.queue[key][0]()
            this.queue[key].splice(0, 1)
        } else {
            delete this.queue[key]
        }
    }

    constructor(options?: IOptions) {
        this.options = {...this.options, ...options}
    }

    run = (key: string) => {
        if (typeof this.callback[key] === 'function') {
            this.callback[key]();
        }
    }
    add = (key: string, callback: TCallbackParam, errorCallback?: TErrorCallbackParam) => {
        if (!this.callback[key]) {
            this.callback[key] = () => callback(() => this.resolve(key));
            if (typeof this.callback[key] === 'function' && this.options.autorun) {
                this.callback[key]();
            }
        } else {
            if (this.queue[key]?.length + 1 > this.options.maxSizeQueue) {
                errorCallback(new Error("Maximum queue size exceeded"))
            } else {
                if (!this.queue[key]) {
                    this.queue[key] = []
                }
                this.queue[key].push(() => callback(() => this.resolve(key)));
            }
        }
    }
}

export {TCallbackParam, IOptions, TErrorCallbackParam, AsyncQueue}


