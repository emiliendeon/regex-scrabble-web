import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DictionaryStore = {
	search: string;
	sorting: {
		criterion: "LENGTH" | "WORD" | "SCORE";
		mode: "ASC" | "DESC";
	};
};

const initialState: DictionaryStore = {
	search: "",
	sorting: {
		criterion: "LENGTH",
		mode: "ASC",
	},
};

const DictionarySlice = createSlice({
	name: "dictionary",
	initialState,
	reducers: {
		setSearch: (state, { payload }: PayloadAction<DictionaryStore["search"]>) => {
			state.search = payload;
		},
		resetSearch: (state) => {
			state.search = initialState.search;
		},
		setSorting: (state, { payload }: PayloadAction<DictionaryStore["sorting"]>) => {
			state.sorting = payload;
		},
	},
});

export const DictionaryActions = DictionarySlice.actions;
export default DictionarySlice.reducer;
