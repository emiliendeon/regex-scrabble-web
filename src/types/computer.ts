type Computer<T> = (t: T) => T;

export type Computers<T> = Record<string, Computer<T>>;
