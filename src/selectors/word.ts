import Regex from "../utils/regex";
import { type Store } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import ods8Words from "../assets/ods8";

const getWord = (_state: Store, word: string | undefined) => word;

const WordSelectors = {
	wordData: createSelector(getWord, (word) => {
		if (!word) {
			return null;
		}

		const wordFormatted = word.toUpperCase();

		if (!ods8Words.includes(wordFormatted)) {
			return null;
		}

		const prefixes1Regex = new RegExp(`^${Regex.prefix1(wordFormatted)}$`);
		const suffixes1Regex = new RegExp(`^${Regex.suffix1(wordFormatted)}$`);

		return {
			word: wordFormatted,

			prefixes1: ods8Words
				.filter((ods8Word) => prefixes1Regex.test(ods8Word))
				.map((ods8Word) => ods8Word.slice(0, 1)),

			suffixes1: ods8Words
				.filter((ods8Word) => suffixes1Regex.test(ods8Word))
				.map((ods8Word) => ods8Word.slice(-1)),
		};
	}),
};

export default WordSelectors;
