import "./dictionary.scss";

import { useDispatch, useSelector } from "../../store";
import { useEffect, useState } from "react";

import Button from "../../components/forms/button/Button";
import { DictionaryActions } from "../../reducers/dictionary";
import IconButton from "../../components/forms/iconButton/IconButton";
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

	useEffect(() => {
		setLocalSearch(search);
	}, [search]);

	const setSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(DictionaryActions.setSearch(localSearch));
	};

	const resetSearch = () => {
		setLocalSearch("");
		dispatch(DictionaryActions.resetSearch());
	};

	return (
		<div id="dictionary">
			<div className="search">
				<form className="main" onSubmit={setSearch}>
					<IconButton icon="close" label={"Réinitialiser"} onClick={resetSearch} />
					<TextInput
						type="search"
						placeholder="Saisir un mot ou un motif"
						value={localSearch}
						onChange={(x) => {
							setLocalSearch(x);
						}}
					/>
					<Button type="submit" label="Rechercher" />
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
