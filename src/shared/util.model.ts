export type ConcreteClass<TClass, TArgs extends any[] = any[]> = {
    new (...args: TArgs): TClass;
};
