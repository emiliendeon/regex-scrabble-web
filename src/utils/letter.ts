import { type Letter } from "../types/letter";

type LetterValue = { count: number; score: number };

export const LetterValues: { [K in Letter]: LetterValue } = {
	A: { count: 9, score: 1 },
	B: { count: 2, score: 3 },
	C: { count: 2, score: 3 },
	D: { count: 3, score: 2 },
	E: { count: 15, score: 1 },
	F: { count: 2, score: 4 },
	G: { count: 2, score: 2 },
	H: { count: 2, score: 4 },
	I: { count: 8, score: 1 },
	J: { count: 1, score: 8 },
	K: { count: 1, score: 10 },
	L: { count: 5, score: 1 },
	M: { count: 3, score: 2 },
	N: { count: 6, score: 1 },
	O: { count: 6, score: 1 },
	P: { count: 2, score: 3 },
	Q: { count: 1, score: 8 },
	R: { count: 6, score: 1 },
	S: { count: 6, score: 1 },
	T: { count: 6, score: 1 },
	U: { count: 6, score: 1 },
	V: { count: 2, score: 4 },
	W: { count: 1, score: 10 },
	X: { count: 1, score: 10 },
	Y: { count: 1, score: 10 },
	Z: { count: 1, score: 10 },
} as const;
