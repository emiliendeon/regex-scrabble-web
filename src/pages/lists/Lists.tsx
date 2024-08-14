import "./lists.scss";

import { ListsActions, initialState } from "../../reducers/lists";
import { MAX_WORD_LENGTH, MIN_WORD_LENGTH } from "../../utils/word";
import { useDispatch, useSelector } from "../../store";
import { useMemo, useState } from "react";

import Button from "../../components/forms/button/Button";
import LettersSelect from "../../components/forms/lettersSelect/LettersSelect";
import NumberInput from "../../components/forms/numberInput/NumberInput";
import SearchForm from "../../components/forms/searchForm/SearchForm";
import WordsSelectors from "../../selectors/words";
import { areEqual } from "../../utils/array";
import { useDebounce } from "../../utils/react";

const Lists = () => {
	const dispatch = useDispatch();

	const { length, letters } = useSelector((state) => state.lists);
	const matchedWords = useSelector((state) => WordsSelectors.byList(state));

	const [localLength, setLocalLength] = useState(length);
	const [localLetters, setLocalLetters] = useState(letters);

	const [isSearchButtonDebounced, setSearchButtonDebounced] = useDebounce([
		localLength,
		localLetters,
	]);

	const isSearchButtonDisabled = useMemo(() => {
		return localLetters.length === 0 || isSearchButtonDebounced;
	}, [localLetters.length, isSearchButtonDebounced]);

	const isResetButtonDisabled = useMemo(() => {
		return (
			areEqual(localLength, initialState.length) &&
			localLetters.length === 0 &&
			matchedWords.length === 0
		);
	}, [localLength, initialState.length, localLetters.length, matchedWords.length]);

	const onChangeLocalMinLength = (value: number) => {
		setLocalLength((prev) => [value, Math.max(value, prev[1])]);
	};

	const onChangeLocalMaxLength = (value: number) => {
		setLocalLength((prev) => [Math.min(value, prev[0]), value]);
	};

	const setSearch = () => {
		dispatch(
			ListsActions.set({
				length: localLength,
				letters: localLetters,
			})
		);
	};

	const resetSearch = () => {
		setLocalLength(initialState.length);
		setLocalLetters(initialState.letters);

		dispatch(ListsActions.reset());
	};

	return (
		<div id="lists">
			<SearchForm
				toggleableMobile
				matchedWords={matchedWords}
				onSubmit={setSearch}
				onDebounce={() => {
					setSearchButtonDebounced(true);
				}}
			>
				<div className="length">
					<NumberInput
						label="Nombre de lettres minimum"
						min={MIN_WORD_LENGTH}
						max={MAX_WORD_LENGTH}
						value={localLength[0]}
						onChange={onChangeLocalMinLength}
					/>
					<NumberInput
						label="Nombre de lettres maximum"
						min={MIN_WORD_LENGTH}
						max={MAX_WORD_LENGTH}
						value={localLength[1]}
						onChange={onChangeLocalMaxLength}
					/>
				</div>
				<LettersSelect
					label="Contenant au moins..."
					multiple
					values={localLetters}
					onChange={setLocalLetters}
				/>
				<div className="actions">
					<Button type="submit" label="Générer" disabled={isSearchButtonDisabled} />
					<Button
						label="Réinitialiser"
						disabled={isResetButtonDisabled}
						onClick={resetSearch}
					/>
				</div>
			</SearchForm>
		</div>
	);
};

export default Lists;
