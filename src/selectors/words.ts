import { type DictionaryStore } from "../reducers/dictionary";
import { type Store } from "../store";
import { WordComputers } from "../computers/word";
import { type WordItem } from "../types/word";
import { createSelector } from "@reduxjs/toolkit";
import ods8Words from "../assets/ods8";

const getSearch = (state: Store) => state.dictionary.search;
const getSorting = (state: Store) => state.dictionary.sorting;

const WordsSelectors = {
	bySearch: createSelector([getSearch, getSorting], (search, sorting): WordItem[] => {
		try {
			const regex = new RegExp(`^${search}$`, "i");

			const words = ods8Words
				.filter((ods8Word) => regex.test(ods8Word))
				.map((ods8Word) => ({
					word: ods8Word,
					...WordComputers.values(ods8Word),
				})) as WordItem[];

			const sort: {
				[K in DictionaryStore["sorting"]["criterion"]]: (
					a: WordItem,
					b: WordItem
				) => number;
			} = {
				LENGTH: (a, b) => a.length - b.length,
				WORD: (a, b) => (a.word < b.word ? -1 : 1),
				SCORE: (a, b) => a.score - b.score,
			};

			return words.sort((a, b) => {
				let cmp = sort[sorting.criterion](a, b);

				const secondarySortingCriteria = Object.keys(sort).filter(
					(sortingCriterion) => sortingCriterion !== sorting.criterion
				) as Array<DictionaryStore["sorting"]["criterion"]>;

				for (let i = 0; cmp === 0 && i < secondarySortingCriteria.length; i++) {
					cmp = sort[secondarySortingCriteria[i]](a, b);
				}

				return sorting.mode === "ASC" ? cmp : -cmp;
			});
		} catch (e) {
			return [];
		}
	}),
};

export default WordsSelectors;
