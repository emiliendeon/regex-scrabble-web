import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DictionaryStore = {
	search: string;
};

const initialState: DictionaryStore = {
	search: "",
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
	},
});

export const DictionaryActions = DictionarySlice.actions;
export default DictionarySlice.reducer;
