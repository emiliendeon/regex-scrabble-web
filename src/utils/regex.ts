import { type Letter, type LetterOrWildcard } from "../types/letter";

const Regex = {
	prefix1: (word: string) => `.${word}`,

	suffix1: (word: string) => `${word}.`,

	prefixOf: (word: string) => `${word}.*`,

	suffixOf: (word: string) => `.*${word}`,

	infixOf: (word: string) => `.*${word}.*`,

	anagram: <AllowWildcards extends boolean = false>(word: string) => {
		type LettersCountsKey = AllowWildcards extends true ? LetterOrWildcard : Letter;

		const lettersCounts: {
			[K in LettersCountsKey]?: number;
		} = {};

		const letters = [...word] as LettersCountsKey[];

		for (const letter of letters) {
			lettersCounts[letter] = (lettersCounts[letter] ?? 0) + 1;
		}

		let regex = "";

		for (const [letter, count] of Object.entries(lettersCounts)) {
			regex += `(?=(.*${letter}){${count as number}})`;
		}

		regex += `.{${word.length}}`;

		return regex;
	},
};

export default Regex;
