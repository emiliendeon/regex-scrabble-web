import { type Store } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import ods8Words from "../assets/ods8";

const getSearch = (state: Store) => state.dictionary.search;

const WordsSelectors = {
	bySearch: createSelector([getSearch], (search) => {
		const regex = new RegExp(`^${search}$`, "i");

		return ods8Words.filter((ods8Word) => regex.test(ods8Word));
	}),
};

export default WordsSelectors;
