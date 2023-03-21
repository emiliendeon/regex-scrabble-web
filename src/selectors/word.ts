import Regex from "../utils/regex";
import { type Store } from "../store";
import { WordProcessors } from "../computers/word";
import { createSelector } from "@reduxjs/toolkit";
import ods8Words from "../assets/ods8";

const getWord = (_state: Store, word: string | undefined) => word;

const WordSelectors = {
	wordData: createSelector([getWord], (word) => {
		if (!word) {
			return null;
		}

		const wordFormatted = word.toUpperCase();

		if (!ods8Words.includes(wordFormatted)) {
			return null;
		}

		const prefixes1Regex = new RegExp(`^${Regex.prefix1(wordFormatted)}$`);
		const suffixes1Regex = new RegExp(`^${Regex.suffix1(wordFormatted)}$`);

		const prefixOfWord = WordProcessors.unprefixed1Part(wordFormatted);
		const suffixOfWord = WordProcessors.unsuffixed1Part(wordFormatted);

		return {
			word: wordFormatted,

			prefixes1: ods8Words
				.filter((ods8Word) => prefixes1Regex.test(ods8Word))
				.map((ods8Word) => ({ word: ods8Word, prefix: WordProcessors.prefix1(ods8Word) })),

			prefixOf: { word: prefixOfWord, valid: ods8Words.includes(prefixOfWord) },

			suffixes1: ods8Words
				.filter((ods8Word) => suffixes1Regex.test(ods8Word))
				.map((ods8Word) => ({ word: ods8Word, suffix: WordProcessors.suffix1(ods8Word) })),

			suffixOf: { word: suffixOfWord, valid: ods8Words.includes(suffixOfWord) },
		};
	}),
};

export default WordSelectors;
