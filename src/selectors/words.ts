import { DefaultSortingOrder } from "../utils/dictionary";
import { type DictionaryStore } from "../reducers/dictionary";
import Regex from "../utils/regex";
import { type Store } from "../store";
import { WordComputers } from "../computers/word";
import { type WordItem } from "../types/word";
import { createSelector } from "@reduxjs/toolkit";
import odsWords from "../assets/ods9";

const getDictionarySearch = (state: Store) => state.dictionary.search;
const getDictionarySorting = (state: Store) => state.dictionary.sorting;

const getListsLength = (state: Store) => state.lists.length;
const getListsLetters = (state: Store) => state.lists.letters;

const getPlacementsConfiguration = (state: Store) => state.placements.configuration;
const getPlacementsLetters = (state: Store) => state.placements.letters;

const WordsSelectors = {
	bySearch: createSelector(
		[getDictionarySearch, getDictionarySorting],
		(search, sorting): WordItem[] => {
			try {
				const regex = new RegExp(`^${search}$`, "i");

				const words = odsWords
					.filter((odsWord) => regex.test(odsWord))
					.map((odsWord) => ({
						word: odsWord,
						...WordComputers.values(odsWord),
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
		}
	),

	byList: createSelector([getListsLength, getListsLetters], (length, letters): WordItem[] => {
		try {
			if (letters.length === 0) {
				return [];
			}

			const regex = new RegExp(
				`^${Regex.lengthAndConjunctiveLetters(length, letters)}$`,
				"i"
			);

			const words = odsWords
				.filter((odsWord) => regex.test(odsWord))
				.map((odsWord) => ({
					word: odsWord,
					...WordComputers.values(odsWord),
				})) as WordItem[];

			return words;
		} catch (e) {
			return [];
		}
	}),

	byPlacements: createSelector(
		[getPlacementsConfiguration, getPlacementsLetters],
		(configuration, letters): WordItem[] => {
			try {
				const regex = new RegExp(`^${Regex.placements(configuration, letters)}$`, "i");

				const words = odsWords
					.filter((odsWord) => regex.test(odsWord))
					.map((odsWord) => ({
						word: odsWord,
						...WordComputers.values(odsWord),
					})) as WordItem[];

				return words.sort((a, b) => b.score - a.score);
			} catch (e) {
				return [];
			}
		}
	),
};

export default WordsSelectors;
