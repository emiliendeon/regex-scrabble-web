export const pluralize = (str: string, count?: number) =>
	count === 0 || count === 1 ? str : `${str}s`;

export type FormatType = "word" | "search";
type Formatter = (input: string) => string;
type Formatters = { [K in FormatType]: Formatter };

export const formatInput: Formatters = {
	word: (input: string) => input.toUpperCase().replace(/[^A-Z]/g, ""),

	search: (input: string) =>
		input
			.toUpperCase()
			.replace(/[ÁÀÂÄÅ]/g, "A")
			.replace(/[Ç]/g, "C")
			.replace(/[ÉÈÊË]/g, "E")
			.replace(/[ÍÌÎÏ]/g, "I")
			.replace(/[Ñ]/g, "N")
			.replace(/[ÓÒÔÖØ]/g, "O")
			.replace(/[ÚÙÛÜ]/g, "U")
			.replace(/[ÝỲŶŸ]/g, "Y")
			.replace(/[Æ]/g, "AE")
			.replace(/[Œ]/g, "OE")
			.replace(/[^A-Z0-9.*+:=<>|^#?!(){}[\]]/g, ""),
};
