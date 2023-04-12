import { DefaultSortingOrder } from "../utils/dictionary";
import { type DictionaryStore } from "../reducers/dictionary";
import Regex from "../utils/regex";
import { type Store } from "../store";
import { WordComputers } from "../computers/word";
import { type WordItem } from "../types/word";
import { createSelector } from "@reduxjs/toolkit";
import ods8Words from "../assets/ods8";

const getSearch = (state: Store) => state.dictionary.search;
const getSorting = (state: Store) => state.dictionary.sorting;

const getConfiguration = (state: Store) => state.placements.configuration;
const getLetters = (state: Store) => state.placements.letters;

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
				const primarySortingCriterionUsed = cmp !== 0;

				if (!primarySortingCriterionUsed) {
					const secondarySortingCriteria = DefaultSortingOrder.filter(
						(sortingCriterion) => sortingCriterion !== sorting.criterion
					);

					for (let i = 0; cmp === 0 && i < secondarySortingCriteria.length; i++) {
						cmp = sort[secondarySortingCriteria[i]](a, b);
					}
				}

				return sorting.mode === "DESC" && primarySortingCriterionUsed ? -cmp : cmp;
			});
		} catch (e) {
			return [];
		}
	}),

	byPlacements: createSelector(
		[getConfiguration, getLetters],
		(configuration, letters): WordItem[] => {
			try {
				const regex = new RegExp(`^${Regex.placements(configuration, letters)}$`, "i");

				const words = ods8Words
					.filter((ods8Word) => regex.test(ods8Word))
					.map((ods8Word) => ({
						word: ods8Word,
						...WordComputers.values(ods8Word),
					})) as WordItem[];

				return words.sort((a, b) => b.score - a.score);
			} catch (e) {
				return [];
			}
		}
	),
};

export default WordsSelectors;
