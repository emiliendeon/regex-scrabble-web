import { type Dispatch, createSelector } from "@reduxjs/toolkit";
import { DictionaryActions } from "../reducers/dictionary";
import DictionaryWorker from "../workers/dictionary.ts?worker";
import Regex from "../utils/regex";
import { type Store } from "../store";
import { WordComputers } from "../computers/word";
import { type WordItem } from "../types/word";
import { compare } from "../utils/word";
import odsWords from "../assets/ods9";

const getDictionarySearch = (state: Store) => state.dictionary.search;
const getDictionarySorting = (state: Store) => state.dictionary.sorting;

const getListsLength = (state: Store) => state.lists.length;
const getListsLetters = (state: Store) => state.lists.letters;

const getPlacementsConfiguration = (state: Store) => state.placements.configuration;
const getPlacementsLetters = (state: Store) => state.placements.letters;

const WordsSelectors = {
	bySearch: createSelector([getDictionarySearch, getDictionarySorting], (search, sorting) => {
		return (dispatch: Dispatch) => {
			try {
				dispatch(DictionaryActions.startLoading());

				const worker = new DictionaryWorker();

				worker.postMessage({
					type: "COMPUTE_MATCHED_WORDS",
					payload: { search, sorting },
				});

				worker.onmessage = (event: { data: WordItem[] }) => {
					dispatch(DictionaryActions.setResult(event.data));
					worker.terminate();
				};

				worker.onerror = () => {
					worker.terminate();
					throw new Error();
				};
			} catch (e) {
				return [];
			}
		};
	}),

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

			return words.sort(compare.LENGTH);
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

				return words.sort((a, b) => -compare.SCORE(a, b));
			} catch (e) {
				return [];
			}
		}
	),
};

export default WordsSelectors;
