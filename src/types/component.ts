type Orientation = "up" | "right" | "down" | "left";

export type Orientable<T> = T & { orientation?: Orientation };
