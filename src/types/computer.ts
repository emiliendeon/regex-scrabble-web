type Processor<T> = (t: T) => T;

type Computer<T> = (t: T) => Record<string, number>;

export type Processors<T> = Record<string, Processor<T>>;

export type Computers<T> = Record<string, Computer<T>>;
