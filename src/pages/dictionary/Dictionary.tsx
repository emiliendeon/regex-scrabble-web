import "./dictionary.scss";

import { useDispatch, useSelector } from "../../store";
import { useEffect, useMemo, useState } from "react";

import Button from "../../components/forms/button/Button";
import { DictionaryActions } from "../../reducers/dictionary";
import SearchHelpers from "./searchHelpers/SearchHelpers";
import Sorting from "./sorting/Sorting";
import TextInput from "../../components/forms/textInput/TextInput";
import WordsList from "../../components/wordsList/WordsList";
import WordsSelectors from "../../selectors/words";

const Dictionary = () => {
	const dispatch = useDispatch();

	const search = useSelector((state) => state.dictionary.search);
	const matchedWords = useSelector((state) => WordsSelectors.bySearch(state));

	const [localSearch, setLocalSearch] = useState(search);

	const [isSearchButtonDebounced, setSearchButtonDebounced] = useState(false);

	const isSearchButtonDisabled = useMemo(() => {
		return localSearch === "" || isSearchButtonDebounced;
	}, [isSearchButtonDebounced, localSearch]);

	useEffect(() => {
		setSearchButtonDebounced(true);
		setLocalSearch(search);
	}, [search]);

	const setSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(DictionaryActions.setSearch(localSearch));
	};

	const resetSearch = () => {
		dispatch(DictionaryActions.resetSearch());
	};

	const onChangeLocalSearch = (value: string) => {
		setLocalSearch(value);
		setSearchButtonDebounced(false);
	};

	return (
		<div id="dictionary">
			<div className="search">
				<form className="main" onSubmit={setSearch}>
					<TextInput
						type="search"
						placeholder="Saisir un mot ou un motif"
						value={localSearch}
						resetable
						onChange={onChangeLocalSearch}
						onReset={resetSearch}
					/>
					<Button type="submit" label="Rechercher" disabled={isSearchButtonDisabled} />
				</form>
				<SearchHelpers />
				<Sorting />
			</div>
			<div className="result">
				<WordsList words={matchedWords} />
			</div>
		</div>
	);
};

export default Dictionary;
