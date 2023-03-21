import { type Store } from "../store";
import { WordComputers } from "../computers/word";
import { type WordItem } from "../types/word";
import { createSelector } from "@reduxjs/toolkit";
import ods8Words from "../assets/ods8";

const getSearch = (state: Store) => state.dictionary.search;

const WordsSelectors = {
	bySearch: createSelector([getSearch], (search): WordItem[] => {
		const regex = new RegExp(`^${search}$`, "i");

		return ods8Words
			.filter((ods8Word) => regex.test(ods8Word))
			.map((ods8Word) => ({
				word: ods8Word,
				...WordComputers.values(ods8Word),
			})) as WordItem[];
	}),
};

export default WordsSelectors;
