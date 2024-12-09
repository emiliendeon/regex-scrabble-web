import { DefaultSortingOrder } from "../utils/dictionary";
import { type DictionaryStore } from "../reducers/dictionary";
import { WordComputers } from "../computers/word";
import { type WordItem } from "../types/word";
import odsWords from "../assets/ods9";

const computeMatchedWords = (
	search: DictionaryStore["search"],
	sorting: DictionaryStore["sorting"]
): WordItem[] => {
	try {
		const regex = new RegExp(`^${search}$`, "i");

		const words = odsWords
			.filter((odsWord) => regex.test(odsWord))
			.map((odsWord) => ({
				word: odsWord,
				...WordComputers.values(odsWord),
			})) as WordItem[];

		const sort: {
			[K in DictionaryStore["sorting"]["criterion"]]: (a: WordItem, b: WordItem) => number;
		} = {
			LENGTH: (a, b) => a.length - b.length,
			WORD: (a, b) => (a.word < b.word ? -1 : 1),
			SCORE: (a, b) => a.score - b.score,
		};

		return words.sort((a, b) => {
			let cmp = sort[sorting.criterion](a, b);
			const primarySortingCriterionUsed = cmp !== 0;

			if (!primarySortingCriterionUsed) {
				const secondarySortingCriteria = DefaultSortingOrder.filter(
					(sortingCriterion) => sortingCriterion !== sorting.criterion
				);

				for (let i = 0; cmp === 0 && i < secondarySortingCriteria.length; i++) {
					cmp = sort[secondarySortingCriteria[i]](a, b);
				}
			}

			return sorting.mode === "DESC" && primarySortingCriterionUsed ? -cmp : cmp;
		});
	} catch (e) {
		return [];
	}
};

self.onmessage = (
	event: MessageEvent<{
		type: "COMPUTE_MATCHED_WORDS";
		payload: Pick<DictionaryStore, "search" | "sorting">;
	}>
) => {
	const {
		type,
		payload: { search, sorting },
	} = event.data;

	if (type === "COMPUTE_MATCHED_WORDS") {
		const result = computeMatchedWords(search, sorting);
		self.postMessage(result);
	}
};
