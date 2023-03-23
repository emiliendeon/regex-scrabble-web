import { type DictionaryStore } from "../reducers/dictionary";

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

export type SearchHelperId = "prefixOf" | "suffixOf" | "infixOf";
type SearchHelper = { label: string; title: string };

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
};
