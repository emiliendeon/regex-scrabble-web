export const pluralize = (str: string, count?: number) =>
	count === 0 || count === 1 ? str : `${str}s`;
