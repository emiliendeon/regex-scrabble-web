/* eslint @typescript-eslint/no-restricted-imports: 0 */

import {
	type TypedUseSelectorHook,
	useDispatch as useDispatchRR,
	useSelector as useSelectorRR,
} from "react-redux";

import DictionaryReducer from "./reducers/dictionary";
import ListsReducer from "./reducers/lists";
import PlacementsReducer from "./reducers/placements";

import { configureStore } from "@reduxjs/toolkit";
import persistCombineReducers from "redux-persist/lib/persistCombineReducers";
import persistStore from "redux-persist/lib/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
};

const rootReducer = persistCombineReducers(persistConfig, {
	dictionary: DictionaryReducer,
	lists: ListsReducer,
	placements: PlacementsReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type Store = ReturnType<typeof store.getState>;
export const useDispatch: () => typeof store.dispatch = useDispatchRR;
export const useSelector: TypedUseSelectorHook<Store> = useSelectorRR;

export default store;
