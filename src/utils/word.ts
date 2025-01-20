import { type DictionaryStore } from "../reducers/dictionary";
import { type WordItem } from "../types/word";

export const MIN_WORD_LENGTH = 2;
export const MAX_WORD_LENGTH = 15;

export const compare: {
	[K in DictionaryStore["sorting"]["criterion"]]: (a: WordItem, b: WordItem) => number;
} = {
	LENGTH: (a, b) => a.length - b.length,
	WORD: (a, b) => (a.word < b.word ? -1 : 1),
	SCORE: (a, b) => a.score - b.score,
};
