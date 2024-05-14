export const clamp = (n: number, min?: number, max?: number) => {
	return Math.min(Math.max(n, min ?? Number.NEGATIVE_INFINITY), max ?? Number.POSITIVE_INFINITY);
};
