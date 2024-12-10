import { type DictionaryStore } from "../reducers/dictionary";
import { JOKERS_COUNT_SUPER } from "./game";
import { MIN_WORD_LENGTH } from "./word";

type SortingOption = DictionaryStore["sorting"] & { label: string; title: string };

export const SortingOptions: SortingOption[] = [
	{
		label: "A...A\u2191",
		title: "Tri par longueur croissante",
		criterion: "LENGTH",
		mode: "ASC",
	},
	{
		label: "A...A\u2193",
		title: "Tri par longueur décroissante",
		criterion: "LENGTH",
		mode: "DESC",
	},
	{
		label: "A-Z\u2191",
		title: "Tri par ordre alphabétique",
		criterion: "WORD",
		mode: "ASC",
	},
	{
		label: "Z-A\u2193",
		title: "Tri par ordre alphabétique inversé",
		criterion: "WORD",
		mode: "DESC",
	},
	{
		label: "$\u2191",
		title: "Tri par nombre de points croissant",
		criterion: "SCORE",
		mode: "ASC",
	},
	{
		label: "$\u2193",
		title: "Tri par nombre de points décroissant",
		criterion: "SCORE",
		mode: "DESC",
	},
];

export const formatSortingValue = (
	sortingOption: DictionaryStore["sorting"]
): `${DictionaryStore["sorting"]["criterion"]}_${DictionaryStore["sorting"]["mode"]}` =>
	`${sortingOption.criterion}_${sortingOption.mode}`;

export const DefaultSortingOrder: Array<DictionaryStore["sorting"]["criterion"]> = [
	"LENGTH",
	"WORD",
	"SCORE",
];

export type SearchHelperId = "prefixOf" | "suffixOf" | "infixOf" | "subAnagram" | "anagram";
type SearchHelper = {
	label: string;
	title: string;
	inputType?: "letters-input";
	minInputLength?: number;
	maxWildcardsCount?: number;
	autoSort?: DictionaryStore["sorting"];
};

export const SearchHelpers: { [K in SearchHelperId]: SearchHelper } = {
	prefixOf: {
		label: "A...",
		title: "Mots commençant par...",
	},
	suffixOf: {
		label: "...A",
		title: "Mots finissant par...",
	},
	infixOf: {
		label: "..A..",
		title: "Mots contenant...",
	},
	subAnagram: {
		label: "Tirage",
		title: "Tous les mots possibles avec...",
		inputType: "letters-input",
		minInputLength: MIN_WORD_LENGTH,
		maxWildcardsCount: JOKERS_COUNT_SUPER,
		autoSort: {
			criterion: "LENGTH",
			mode: "DESC",
		},
	},
	anagram: {
		label: "Anagrammes",
		title: "Anagrammes",
		inputType: "letters-input",
		minInputLength: MIN_WORD_LENGTH,
	},
};
