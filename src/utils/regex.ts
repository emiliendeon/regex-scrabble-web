import { type Letter } from "../types/letter";
import { Word } from "../types/word";

const Regex = {
	prefix1: (word: string) => `.${word}`,

	suffix1: (word: string) => `${word}.`,

	anagram: (word: string) => {
		const lettersCounts: { [K in Letter]?: number } = {};

		for (const letter of new Word(word).asLetterArray) {
			lettersCounts[letter] = (lettersCounts[letter] ?? 0) + 1;
		}

		let regex = "";

		for (const [letter, count] of Object.entries(lettersCounts)) {
			regex += `(?=(.*${letter}){${count}})`;
		}

		regex += `.{${word.length}}`;

		return regex;
	},
};

export default Regex;
