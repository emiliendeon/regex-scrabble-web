import { type Computers, type Processors } from "../types/computer";
import { Word, type WordValues } from "../types/word";
import { type Letter } from "../types/letter";
import { LetterValues } from "../utils/letter";

export const WordProcessors: Processors<string> = {
	prefix1: (word: string) => word.slice(0, 1),

	suffix1: (word: string) => word.slice(-1),

	unprefixed1Part: (word: string) => word.substring(1),

	unsuffixed1Part: (word: string) => word.slice(0, -1),
};

export const WordComputers: Computers<string> = {
	values: (word: string): WordValues => {
		const remainingLetterCounts = (Object.keys(LetterValues) as Letter[]).reduce(
			(acc, key) => ({ ...acc, [key]: LetterValues[key].count }),
			{}
		) as { [K in Letter]: number };

		let score = 0;
		let scoreUnrestricted = 0;
		let jokersCount = 0;

		for (const letter of new Word(word).asLetterArray) {
			scoreUnrestricted += LetterValues[letter].score;
			if (remainingLetterCounts[letter] >= 1) {
				score += LetterValues[letter].score;
				remainingLetterCounts[letter]--;
			} else {
				jokersCount++;
			}
		}

		return { length: word.length, score, scoreUnrestricted, jokersCount };
	},
};
