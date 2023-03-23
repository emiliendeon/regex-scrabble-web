import "./dictionary.scss";

import { useDispatch, useSelector } from "../../store";
import { useEffect, useMemo, useState } from "react";

import Button from "../../components/forms/button/Button";
import { DictionaryActions } from "../../reducers/dictionary";
import IconButton from "../../components/forms/iconButton/IconButton";
import LazyList from "../../components/lazyList/LazyList";
import SearchHelpers from "./searchHelpers/SearchHelpers";
import Sorting from "./sorting/Sorting";
import TextInput from "../../components/forms/textInput/TextInput";
import WordItem from "../../components/wordItem/WordItem";
import { type WordItem as WordItemType } from "../../types/word";
import WordsSelectors from "../../selectors/words";
import { pluralize } from "../../utils/string";

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

	const wordsCount = useMemo(() => {
		return matchedWords.length;
	}, [matchedWords]);

	return (
		<div id="dictionary">
			<form className="search" onSubmit={setSearch}>
				<div className="main">
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
				</div>
				<SearchHelpers />
				<Sorting />
			</form>
			<div className="result">
				<LazyList<WordItemType>
					items={matchedWords}
					headerComponent={() => (
						<div className="count">
							{wordsCount} {pluralize("mot", wordsCount)}{" "}
							{pluralize("trouvé", wordsCount)}
						</div>
					)}
					itemRenderer={({ item }) => <WordItem wordItem={item} />}
				/>
			</div>
		</div>
	);
};

export default Dictionary;
