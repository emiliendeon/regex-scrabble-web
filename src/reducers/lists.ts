import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type Letter } from "../types/letter";
import { type Range } from "../types/number";

export type ListsStore = {
	length: Range;
	letters: Letter[];
};

export const initialState: ListsStore = {
	length: [2, 2],
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
