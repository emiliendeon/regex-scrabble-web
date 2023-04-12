import { type Letter, type LetterOrWildcard, Letters } from "../types/letter";

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

const mergeLettersCounts = (lettersCountsArray: Array<LettersCounts<any>>) => {
	return [...Letters, "."].reduce((acc, letter) => {
		const letterCount = lettersCountsArray.reduce(
			(count, lettersCounts) => count + (lettersCounts[letter as LetterOrWildcard] ?? 0),
			0
		);

		return letterCount >= 1 ? { ...acc, [letter]: letterCount } : acc;
	}, {});
};

const computeUniqueLetters = <IncludeWildcards extends boolean = false>(
	word: string,
	includeWildcards?: IncludeWildcards
): LettersArray<IncludeWildcards> => {
	return [...new Set(filterWildcards<IncludeWildcards>(word, includeWildcards)).values()];
};

const RegexParts = {
	minLettersCounts: (lettersCounts: LettersCounts<false>) => {
		let regex = "";

		for (const [letter, count] of Object.entries(lettersCounts)) {
			regex += `(?=(.*${letter}){${count}})`;
		}

		return regex;
	},

	maxLettersCounts: (lettersCounts: LettersCounts<any>, wildcardsCount?: number) => {
		let regex = "";

		for (const [letter, count] of Object.entries(lettersCounts).filter(
			([letter]) => letter !== "."
		)) {
			regex += `(?!(.*${letter}){${count + (wildcardsCount ?? 0) + 1},})`;
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

		return [
			RegexParts.maxLettersCounts(lettersCounts, wildcardsCount),
			`(?!(.*[^${computeUniqueLetters(word).join("")}]){${wildcardsCount + 1},})`,
			`.{2,${word.length}}`,
		].join("");
	},

	placements: (configuration: string, letters: string) => {
		const configurationLettersCounts = computeLettersCounts(configuration, true);
		const drawLettersCounts = computeLettersCounts(letters, true);
		const lettersCounts = mergeLettersCounts([configurationLettersCounts, drawLettersCounts]);

		const fixedLettersCount = configuration.length - (configurationLettersCounts["."] ?? 0);
		const wildcardsCount = drawLettersCounts["."] ?? 0;

		return [
			RegexParts.maxLettersCounts(lettersCounts, wildcardsCount),
			`(?!(.*[^${computeUniqueLetters(letters).join("")}]){${
				fixedLettersCount + wildcardsCount + 1
			},})`,
			`(?!.{${fixedLettersCount + letters.length + 1},})`,
			`.*${configuration}.*`,
		].join("");
	},
};

export default Regex;
