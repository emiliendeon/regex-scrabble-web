import "./lists.scss";

import { ListsActions, initialState } from "../../reducers/lists";
import { useDispatch, useSelector } from "../../store";
import { useMemo, useState } from "react";
import Button from "../../components/forms/button/Button";
import IconButton from "../../components/forms/iconButton/IconButton";
import { type Letter } from "../../types/letter";
import LettersSelect from "../../components/forms/lettersSelect/LettersSelect";
import NumberInput from "../../components/forms/numberInput/NumberInput";
import WordsList from "../../components/wordsList/WordsList";
import WordsSelectors from "../../selectors/words";
import { areEqual } from "../../utils/array";
import clsx from "clsx";

const Lists = () => {
	const dispatch = useDispatch();

	const { length, letters } = useSelector((state) => state.lists);
	const matchedWords = useSelector((state) => WordsSelectors.byList(state));

	const [localLength, setLocalLength] = useState(length);
	const [localLetters, setLocalLetters] = useState(letters);

	const [isSearchFormVisible, setSearchFormVisible] = useState(true);
	const [isSearchButtonDebounced, setSearchButtonDebounced] = useState(false);

	const isSearchButtonDisabled = useMemo(() => {
		return localLetters.length === 0 || isSearchButtonDebounced;
	}, [localLetters.length, isSearchButtonDebounced]);

	const isResetButtonDisabled = useMemo(() => {
		return areEqual(localLength, initialState.length) && localLetters.length === 0;
	}, [localLength, localLetters.length]);

	const onChangeLocalMinLength = (value: number) => {
		setLocalLength((prev) => [value, prev[1]]);
		setSearchButtonDebounced(false);
	};

	const onChangeLocalMaxLength = (value: number) => {
		setLocalLength((prev) => [prev[0], value]);
		setSearchButtonDebounced(false);
	};

	const onChangeLocalLetters = (values: Letter[]) => {
		setLocalLetters(values);
		setSearchButtonDebounced(false);
	};

	const setSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setSearchButtonDebounced(true);

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
		<div id="lists" className={clsx({ "search-form-visible": isSearchFormVisible })}>
			<div className="search">
				<form className="main" onSubmit={setSearch}>
					<div className="length">
						<NumberInput
							label="Nombre de lettres minimum"
							min={2}
							max={21}
							value={localLength[0]}
							onChange={onChangeLocalMinLength}
						/>
						<NumberInput
							label="Nombre de lettres maximum"
							min={2}
							max={21}
							value={localLength[1]}
							onChange={onChangeLocalMaxLength}
						/>
					</div>
					<LettersSelect
						label="Contenant au moins..."
						multiple
						values={localLetters}
						onChange={onChangeLocalLetters}
					/>
					<div className="actions">
						<Button type="submit" label="Générer" disabled={isSearchButtonDisabled} />
						<Button
							label="Réinitialiser"
							disabled={isResetButtonDisabled}
							onClick={resetSearch}
						/>
					</div>
				</form>
				<IconButton
					icon="caret"
					label={
						isSearchFormVisible
							? "Réduire le formulaire de recherche"
							: "Afficher le formulaire de recherche"
					}
					orientation={isSearchFormVisible ? "up" : "down"}
					onClick={() => {
						setSearchFormVisible((prev) => !prev);
					}}
				/>
			</div>
			<div className="result">
				<WordsList words={matchedWords} />
			</div>
		</div>
	);
};

export default Lists;
