import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type Letter } from "../types/letter";
import { MIN_WORD_LENGTH } from "../utils/word";
import { type Range } from "../types/number";

export type ListsStore = {
	length: Range;
	letters: Letter[];
};

export const initialState: ListsStore = {
	length: [MIN_WORD_LENGTH, MIN_WORD_LENGTH],
	letters: [],
};

const ListsSlice = createSlice({
	name: "lists",
	initialState,
	reducers: {
		set: (state, { payload }: PayloadAction<Partial<ListsStore>>) => {
			return { ...state, ...payload };
		},
		reset: () => {
			return initialState;
		},
	},
});

export const ListsActions = ListsSlice.actions;
export default ListsSlice.reducer;
