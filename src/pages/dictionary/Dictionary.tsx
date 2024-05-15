import "./dictionary.scss";

import { type SearchHelperId, SearchHelpers as SearchHelpersList } from "../../utils/dictionary";
import { useDispatch, useSelector } from "../../store";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/forms/button/Button";
import { DictionaryActions } from "../../reducers/dictionary";
import LettersInput from "../../components/forms/lettersInput/LettersInput";
import Modal from "../../components/modal/Modal";
import Regex from "../../utils/regex";
import SearchForm from "../../components/forms/searchForm/SearchForm";
import SearchHelpers from "./searchHelpers/SearchHelpers";
import Sorting from "./sorting/Sorting";
import TextInput from "../../components/forms/textInput/TextInput";
import WordsSelectors from "../../selectors/words";
import { useDebounce } from "../../utils/react";
import { useNavigate } from "react-router-dom";

const Dictionary = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const search = useSelector((state) => state.dictionary.search);
	const matchedWords = useSelector((state) => WordsSelectors.bySearch(state));

	const [localSearch, setLocalSearch] = useState(search);

	const [isSearchButtonDebounced, setSearchButtonDebounced] = useDebounce([localSearch]);

	const [currentHelperId, setCurrentHelperId] = useState<SearchHelperId | null>(null);
	const [helperInput, setHelperInput] = useState("");

	const helperTextInputRef = useRef<HTMLInputElement>(null);

	const isSearchButtonDisabled = useMemo(() => {
		return localSearch === "" || isSearchButtonDebounced;
	}, [isSearchButtonDebounced, localSearch]);

	const currentHelper = useMemo(() => {
		return currentHelperId ? SearchHelpersList[currentHelperId] : null;
	}, [currentHelperId]);

	useEffect(() => {
		setSearchButtonDebounced(true);
		setLocalSearch(search);
	}, [search]);

	const setSearch = () => {
		dispatch(DictionaryActions.setSearch(localSearch));
	};

	const resetSearch = () => {
		dispatch(DictionaryActions.resetSearch());
	};

	const onLoadHelper = () => {
		helperTextInputRef.current?.focus();
	};

	const onCloseHelper = () => {
		setCurrentHelperId(null);
		setHelperInput("");
	};

	const onValidateHelper = () => {
		if (helperInput) {
			navigate("/");

			const search = Regex[currentHelperId as SearchHelperId](helperInput);
			dispatch(
				DictionaryActions.set({
					search,
					...(currentHelper?.autoSort ? { sorting: currentHelper.autoSort } : {}),
				})
			);

			onCloseHelper();
		}
	};

	return (
		<div id="dictionary">
			<SearchForm matchedWords={matchedWords} onSubmit={setSearch}>
				<div className="input">
					<TextInput
						type="search"
						placeholder="Saisir un mot ou un motif"
						value={localSearch}
						resetable
						onChange={setLocalSearch}
						onReset={resetSearch}
					/>
					<Button type="submit" label="Rechercher" disabled={isSearchButtonDisabled} />
				</div>
				<SearchHelpers
					currentHelperId={currentHelperId}
					onChangeCurrentHelperId={(currentHelperId) => {
						setCurrentHelperId(currentHelperId);
					}}
				/>
				<Sorting />
			</SearchForm>
			<Modal
				visible={Boolean(currentHelperId)}
				title={currentHelper?.title}
				onLoad={onLoadHelper}
				onClose={onCloseHelper}
				onValidate={onValidateHelper}
			>
				{currentHelper?.inputType === "letters-input" ? (
					<LettersInput
						ref={helperTextInputRef}
						maxWildcardsCount={currentHelper.maxWildcardsCount}
						value={helperInput}
						onChange={(x) => {
							setHelperInput(x);
						}}
					/>
				) : (
					<TextInput
						ref={helperTextInputRef}
						type="word"
						value={helperInput}
						onChange={(x) => {
							setHelperInput(x);
						}}
					/>
				)}
			</Modal>
		</div>
	);
};

export default Dictionary;
