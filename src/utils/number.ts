import { type OptionalRange } from "../types/number";

export const isNumberInRange = (range: OptionalRange, n: number) => {
	const [min, max] = range;
	return (min === undefined || n >= min) && (max === undefined || n <= max);
};

export const clamp = (range: OptionalRange, n: number) => {
	const [min, max] = range;
	return Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min ?? Number.NEGATIVE_INFINITY, n));
};
