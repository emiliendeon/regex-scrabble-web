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
	},
});

export const DictionaryActions = DictionarySlice.actions;
export default DictionarySlice.reducer;
