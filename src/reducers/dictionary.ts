import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DictionaryStore {
	search: string;
}

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
	},
});

export const DictionaryActions = DictionarySlice.actions;
export default DictionarySlice.reducer;
