import { WordComputers, WordProcessors } from "../computers/word";
import Meta from "../utils/meta";
import Regex from "../utils/regex";
import { type Store } from "../store";
import { type WordData } from "../types/word";
import { createSelector } from "@reduxjs/toolkit";
import ods8Words from "../assets/ods8";

const getWord = (_state: Store, word: string | undefined) => word;

const WordSelectors = {
	wordData: createSelector([getWord], (word): WordData | null => {
		if (!word) {
			return null;
		}

		const wordFormatted = word.toUpperCase();

		if (!ods8Words.includes(wordFormatted)) {
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
				words: ods8Words
					.filter((ods8Word) => prefixes1Regex.test(ods8Word))
					.map((ods8Word) => ({
						word: ods8Word,
						prefix: WordProcessors.prefix1(ods8Word),
					})),
			},

			suffixes1: {
				search: suffixes1Search,
				words: ods8Words
					.filter((ods8Word) => suffixes1Regex.test(ods8Word))
					.map((ods8Word) => ({
						word: ods8Word,
						suffix: WordProcessors.suffix1(ods8Word),
					})),
			},

			prefixOf: { word: prefixOfWord, valid: ods8Words.includes(prefixOfWord) },

			suffixOf: { word: suffixOfWord, valid: ods8Words.includes(suffixOfWord) },

			anagrams: {
				search: anagramsSearch,
				words: ods8Words.filter(
					(ods8Word) => ods8Word !== wordFormatted && anagramsRegex.test(ods8Word)
				),
			},

			...WordComputers.values(wordFormatted),
		} as WordData;
	}),
};

export default WordSelectors;
