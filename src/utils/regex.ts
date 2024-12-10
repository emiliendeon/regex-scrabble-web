import { type Letter, type LetterOrWildcard, Letters } from "../types/letter";
import { MIN_WORD_LENGTH } from "./word";
import { type Range } from "../types/number";

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

const RegexBuilders = {
	disjunction: (regexParts: Array<string | null>) =>
		`(${regexParts
			.filter((regexPart) => Boolean(regexPart))
			.map((regexPart) => `(${regexPart as string})`)
			.join("|")})`,

	lettersDisjunction: (letters: string) => `[${computeUniqueLetters(letters).join("")}]`,

	foreignLettersDisjunction: (foreignLetters: string) =>
		`[^${computeUniqueLetters(foreignLetters).join("")}]`,

	wordLength: ([min, max]: Partial<Range>, pattern?: string) =>
		`${pattern ?? "."}${min || max ? `{${min ?? MIN_WORD_LENGTH},${max ?? ""}}` : ""}`,

	minWordLength: (min: number) => `(?=.{${min},})`,

	maxWordLength: (max: number) => `(?!.{${max + 1},})`,

	minLettersCount: (letters: string, count: number) =>
		`(?=(.*${RegexBuilders.lettersDisjunction(letters)}){${count},})`,

	maxLettersCount: (letters: string, count: number) =>
		`(?!(.*${RegexBuilders.lettersDisjunction(letters)}){${count + 1},})`,

	minForeignLettersCount: (foreignFromLetters: string, count: number) =>
		`(?=(.*${RegexBuilders.foreignLettersDisjunction(foreignFromLetters)}){${count},})`,

	maxForeignLettersCount: (foreignFromLetters: string, count: number) =>
		`(?!(.*${RegexBuilders.foreignLettersDisjunction(foreignFromLetters)}){${count + 1},})`,

	minLettersCounts: (lettersCounts: LettersCounts<false>) => {
		let regex = "";

		for (const [letter, count] of Object.entries(lettersCounts).filter(
			([letter]) => letter !== "."
		)) {
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
		return [
			RegexBuilders.minLettersCounts(computeLettersCounts(word)),
			RegexBuilders.wordLength([word.length, word.length]),
		].join("");
	},

	subAnagram: (word: string) => {
		const lettersCounts = computeLettersCounts(word, true);
		const wildcardsCount = lettersCounts["."] ?? 0;

		return RegexBuilders.disjunction([
			word.length - wildcardsCount >= MIN_WORD_LENGTH
				? [
						RegexBuilders.maxLettersCounts(lettersCounts, wildcardsCount),
						RegexBuilders.wordLength(
							[MIN_WORD_LENGTH, word.length - wildcardsCount],
							RegexBuilders.lettersDisjunction(word)
						),
				  ].join("")
				: null,
			wildcardsCount >= 1
				? [
						RegexBuilders.minLettersCounts(lettersCounts),
						RegexBuilders.wordLength([word.length - wildcardsCount + 1, word.length]),
				  ].join("")
				: null,
		]);
	},

	lengthAndConjunctiveLetters: (length: Range, letters: Letter[]) => {
		return [
			RegexBuilders.minLettersCounts(
				letters.reduce((acc, letter) => ({ ...acc, [letter]: 1 }), {})
			),
			RegexBuilders.wordLength(length),
		].join("");
	},

	placements: (configuration: string, letters: string) => {
		const configurationLettersCounts = computeLettersCounts(configuration, true);
		const drawLettersCounts = computeLettersCounts(letters, true);
		const lettersCounts = mergeLettersCounts([configurationLettersCounts, drawLettersCounts]);

		const configurationWildcardsCount = configurationLettersCounts["."] ?? 0;
		const drawWildcardsCount = drawLettersCounts["."] ?? 0;
		const fixedLettersCount = configuration.length - configurationWildcardsCount;

		const commonLettersCount = [...configuration].filter(
			(letter) => letter !== "." && letters.includes(letter)
		).length;

		const uniqueConfigurationLettersJoined = computeUniqueLetters(configuration).join("");
		const uniqueDrawLettersJoined = computeUniqueLetters(letters).join("");

		const configurationPart = `.*${configuration}.*`;

		const regexParts = [];

		for (
			let wordLength = configuration.length;
			wordLength <= fixedLettersCount + letters.length;
			wordLength++
		) {
			const configurationWildcardsCount = wordLength - fixedLettersCount;

			const minNonConfigurationLettersCount = Math.max(
				0,
				configurationWildcardsCount - drawWildcardsCount - commonLettersCount
			);

			const minDrawLettersCount = Math.max(
				0,
				configurationWildcardsCount - drawWildcardsCount + commonLettersCount
			);

			regexParts.push(
				[
					RegexBuilders.maxLettersCounts(lettersCounts),
					RegexBuilders.minLettersCount(uniqueDrawLettersJoined, minDrawLettersCount),
					RegexBuilders.minForeignLettersCount(
						uniqueConfigurationLettersJoined,
						minNonConfigurationLettersCount
					),
					RegexBuilders.minWordLength(wordLength),
					RegexBuilders.maxWordLength(wordLength),
					configurationPart,
				].join("")
			);
		}

		return RegexBuilders.disjunction(regexParts);
	},
};

export default Regex;
