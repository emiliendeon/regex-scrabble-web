import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PlacementsStore = {
	configuration: string;
	letters: string;
};

const initialState: PlacementsStore = {
	configuration: "",
	letters: "",
};

const PlacementsSlice = createSlice({
	name: "placements",
	initialState,
	reducers: {
		set: (state, { payload }: PayloadAction<Partial<PlacementsStore>>) => {
			return { ...state, ...payload };
		},
		reset: () => {
			return initialState;
		},
	},
});

export const PlacementsActions = PlacementsSlice.actions;
export default PlacementsSlice.reducer;
