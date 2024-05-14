import "./dictionary.scss";

import { useDispatch, useSelector } from "../../store";
import { useEffect, useMemo, useState } from "react";

import Button from "../../components/forms/button/Button";
import { DictionaryActions } from "../../reducers/dictionary";
import SearchForm from "../../components/forms/searchForm/SearchForm";
import SearchHelpers from "./searchHelpers/SearchHelpers";
import Sorting from "./sorting/Sorting";
import TextInput from "../../components/forms/textInput/TextInput";
import WordsSelectors from "../../selectors/words";
import { useDebounce } from "../../utils/react";

const Dictionary = () => {
	const dispatch = useDispatch();

	const search = useSelector((state) => state.dictionary.search);
	const matchedWords = useSelector((state) => WordsSelectors.bySearch(state));

	const [localSearch, setLocalSearch] = useState(search);

	const [isSearchButtonDebounced, setSearchButtonDebounced] = useDebounce([localSearch]);

	const isSearchButtonDisabled = useMemo(() => {
		return localSearch === "" || isSearchButtonDebounced;
	}, [isSearchButtonDebounced, localSearch]);

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
				<SearchHelpers />
				<Sorting />
			</SearchForm>
		</div>
	);
};

export default Dictionary;
