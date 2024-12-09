import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type WordItem } from "../types/word";

export type DictionaryStore = {
	search: string;
	sorting: {
		criterion: "LENGTH" | "WORD" | "SCORE";
		mode: "ASC" | "DESC";
	};
	isLoading: boolean;
	matchedWords: WordItem[];
};

const initialState: DictionaryStore = {
	search: "",
	sorting: {
		criterion: "LENGTH",
		mode: "ASC",
	},
	isLoading: false,
	matchedWords: [],
};

const DictionarySlice = createSlice({
	name: "dictionary",
	initialState,
	reducers: {
		set: (state, { payload }: PayloadAction<Partial<DictionaryStore>>) => {
			return { ...state, ...payload };
		},
		setSearch: (state, { payload }: PayloadAction<DictionaryStore["search"]>) => {
			return { ...state, search: payload };
		},
		resetSearch: (state) => {
			return { ...state, search: initialState.search };
		},
		setSorting: (state, { payload }: PayloadAction<DictionaryStore["sorting"]>) => {
			return { ...state, sorting: payload };
		},
		startLoading: (state) => {
			return { ...state, isLoading: true };
		},
		setResult: (state, { payload }: PayloadAction<DictionaryStore["matchedWords"]>) => {
			return { ...state, isLoading: false, matchedWords: payload };
		},
		resetResult: (state) => {
			return { ...state, matchedWords: initialState.matchedWords };
		},
	},
});

export const DictionaryActions = DictionarySlice.actions;
export default DictionarySlice.reducer;
