export type Unsubscribe = () => void;

export type PickFunctions<T extends object> = {
    [K in keyof T]: T[K] extends Function ? K : never;
};

export type PickFunctionKeys<T extends object> = PickFunctions<T>[keyof T];
