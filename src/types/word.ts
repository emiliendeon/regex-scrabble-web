import { type Letter, Letters } from "./letter";

type WordValue = [Letter, ...Letter[]] & {
	length:
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21;
};

export class Word {
	private readonly _word: WordValue | null = null;

	constructor(word: string) {
		if (!(word.length >= 2 && word.length <= 21)) {
			throw Error("Invalid word length");
		}

		for (const letter of word) {
			if (!(Letters as readonly string[]).includes(letter)) {
				throw Error("Invalid letter");
			}
		}

		this._word = [...word] as WordValue;
	}

	get word() {
		return this._word?.join("");
	}

	get asLetterArray() {
		return this._word ?? [];
	}
}

export type WordValues = {
	length: number;
	score: number;
	scoreUnrestricted: number;
	jokersCount: number;
};

export type WordItem = {
	word: string;
} & WordValues;
