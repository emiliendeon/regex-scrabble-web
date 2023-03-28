import { type Letter, type LetterOrWildcard } from "../types/letter";

type LettersCountsKey<IncludeWildcards extends boolean> = IncludeWildcards extends true
	? LetterOrWildcard
	: Letter;

type LettersCounts<IncludeWildcards extends boolean> = {
	[K in LettersCountsKey<IncludeWildcards>]?: number;
};

type LettersArray<IncludeWildcards extends boolean> = Array<LettersCountsKey<IncludeWildcards>>;

const filterWildcards = <IncludeWildcards extends boolean>(
	word: string,
	includeWildcards?: IncludeWildcards
) => {
	const letters = [...word] as LettersArray<IncludeWildcards>;

	return includeWildcards ? letters : letters.filter((letter) => letter !== ".");
};

const computeLettersCounts = <IncludeWildcards extends boolean = false>(
	word: string,
	includeWildcards?: IncludeWildcards
): LettersCounts<IncludeWildcards> => {
	const lettersCounts: LettersCounts<IncludeWildcards> = {};

	for (const letter of filterWildcards<IncludeWildcards>(word, includeWildcards)) {
		lettersCounts[letter] = (lettersCounts[letter] ?? 0) + 1;
	}

	return lettersCounts;
};

const computeUniqueLetters = <IncludeWildcards extends boolean = false>(
	word: string,
	includeWildcards?: IncludeWildcards
): LettersArray<IncludeWildcards> => {
	return [...new Set(filterWildcards<IncludeWildcards>(word, includeWildcards)).values()];
};

const RegexParts = {
	minLettersCounts: (lettersCounts: LettersCounts<any>) => {
		let regex = "";

		for (const [letter, count] of Object.entries(lettersCounts)) {
			regex += `(?=(.*${letter}){${count}})`;
		}

		return regex;
	},

	maxLettersCounts: (lettersCounts: LettersCounts<any>) => {
		let regex = "";

		for (const [letter, count] of Object.entries(lettersCounts)) {
			regex += `(?!(.*${letter}){${count + 1},})`;
		}

		return regex;
	},
};

const Regex = {
	prefix1: (word: string) => `.${word}`,

	suffix1: (word: string) => `${word}.`,

	prefixOf: (word: string) => `${word}.*`,

	suffixOf: (word: string) => `.*${word}`,

	infixOf: (word: string) => `.*${word}.*`,

	anagram: (word: string) => {
		return [RegexParts.minLettersCounts(computeLettersCounts(word)), `.{${word.length}}`].join(
			""
		);
	},

	subAnagram: (word: string) => {
		const lettersCounts = computeLettersCounts(word, true);
		const wildcardsCount = lettersCounts["."] ?? 0;

		const maxLettersCounts = Object.entries(lettersCounts)
			.filter(([letter]) => letter !== ".")
			.reduce(
				(acc, [letter, count]) => ({
					...acc,
					[letter]: count + wildcardsCount,
				}),
				{}
			);

		return [
			RegexParts.maxLettersCounts(maxLettersCounts),
			`(?!(.*[^${computeUniqueLetters(word).join("")}]){${wildcardsCount + 1},})`,
			`.{2,${word.length}}`,
		].join("");
	},
};

export default Regex;
