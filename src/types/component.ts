export type PropsWithClassName<T> = T & {
	className?: string;
};

export type Orientation = "up" | "right" | "down" | "left";

export type Orientable<T> = T & { orientation?: Orientation };
