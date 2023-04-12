const _combinations = <T>(
	remainingElements: T[],
	currentPath: T[],
	currentCombinations: T[][],
	minLength?: number
): void => {
	if (!minLength || currentPath.length >= minLength) {
		currentCombinations.push(currentPath);
	}

	if (remainingElements.length === 0) {
		return;
	}

	for (let i = 0; i < remainingElements.length; i++) {
		_combinations(
			remainingElements.slice(i + 1),
			[...currentPath, remainingElements[i]],
			currentCombinations,
			minLength
		);
	}
};

export const combinations = <T>(elements: T[], minLength?: number) => {
	const combs: T[][] = [];
	_combinations(elements, [], combs, minLength);
	return combs;
};
