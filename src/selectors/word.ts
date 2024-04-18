import { WordComputers, WordProcessors } from "../computers/word";
import Meta from "../utils/meta";
import Regex from "../utils/regex";
import { type Store } from "../store";
import { type WordData } from "../types/word";
import { createSelector } from "@reduxjs/toolkit";
import odsWords from "../assets/ods9";

const getWord = (_state: Store, word: string | undefined) => word;

const WordSelectors = {
	wordData: createSelector([getWord], (word): WordData | null => {
		if (!word) {
			return null;
		}

		const wordFormatted = word.toUpperCase();

		if (!odsWords.includes(wordFormatted)) {
			return null;
		}

		const prefixes1Search = Regex.prefix1(wordFormatted);
		const prefixes1Regex = new RegExp(`^${prefixes1Search}$`);

		const suffixes1Search = Regex.suffix1(wordFormatted);
		const suffixes1Regex = new RegExp(`^${suffixes1Search}$`);

		const prefixOfWord = WordProcessors.unprefixed1Part(wordFormatted);
		const suffixOfWord = WordProcessors.unsuffixed1Part(wordFormatted);

		const anagramsSearch = Regex.anagram(wordFormatted);
		const anagramsRegex = new RegExp(`^${anagramsSearch}$`);

		return {
			word: wordFormatted,

			title: `${wordFormatted} | ${Meta.title}`,

			prefixes1: {
				search: prefixes1Search,
				words: odsWords
					.filter((odsWord) => prefixes1Regex.test(odsWord))
					.map((odsWord) => ({
						word: odsWord,
						prefix: WordProcessors.prefix1(odsWord),
					})),
			},

			suffixes1: {
				search: suffixes1Search,
				words: odsWords
					.filter((odsWord) => suffixes1Regex.test(odsWord))
					.map((odsWord) => ({
						word: odsWord,
						suffix: WordProcessors.suffix1(odsWord),
					})),
			},

			prefixOf: { word: prefixOfWord, valid: odsWords.includes(prefixOfWord) },

			suffixOf: { word: suffixOfWord, valid: odsWords.includes(suffixOfWord) },

			anagrams: {
				search: anagramsSearch,
				words: odsWords.filter(
					(odsWord) => odsWord !== wordFormatted && anagramsRegex.test(odsWord)
				),
			},

			...WordComputers.values(wordFormatted),
		} as WordData;
	}),
};

export default WordSelectors;
