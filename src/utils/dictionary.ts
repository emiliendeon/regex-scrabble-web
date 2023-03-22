import { type DictionaryStore } from "../reducers/dictionary";

type SortingOption = DictionaryStore["sorting"] & { label: string; title: string };

export const SortingOptions: SortingOption[] = [
	{
		label: "A \u2192 AAA",
		title: "Tri par longueur croissante",
		criterion: "LENGTH",
		mode: "ASC",
	},
	{
		label: "AAA \u2192 A",
		title: "Tri par longueur décroissante",
		criterion: "LENGTH",
		mode: "DESC",
	},
	{
		label: "A \u2192 Z",
		title: "Tri par ordre alphabétique",
		criterion: "WORD",
		mode: "ASC",
	},
	{
		label: "Z \u2192 A",
		title: "Tri par ordre alphabétique inversé",
		criterion: "WORD",
		mode: "DESC",
	},
	{
		label: "$ \u2192 $$$",
		title: "Tri par nombre de points croissant",
		criterion: "SCORE",
		mode: "ASC",
	},
	{
		label: "$$$ \u2192 $",
		title: "Tri par nombre de points décroissant",
		criterion: "SCORE",
		mode: "DESC",
	},
];

export const formatSortingValue = (
	sortingOption: DictionaryStore["sorting"]
): `${DictionaryStore["sorting"]["criterion"]}_${DictionaryStore["sorting"]["mode"]}` =>
	`${sortingOption.criterion}_${sortingOption.mode}`;
