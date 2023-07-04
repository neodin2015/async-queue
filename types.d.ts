export type TQueue = {
    [key: string]: (() => void)[]
}
export type TCallback = {
    [key: string]: (() => void)
};
export type TCallbackParam = (resolve: () => void) => void;
export type TErrorCallbackParam = (error: Error) => void;

export interface IOptions {
    autorun?: boolean;
    maxSizeQueue?: number;
}
