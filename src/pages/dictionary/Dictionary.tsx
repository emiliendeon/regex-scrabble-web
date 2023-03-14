import "./dictionary.scss";

import { useDispatch, useSelector } from "../../store";
import { useMemo, useState } from "react";

import Button from "../../components/forms/button/Button";
import { DictionaryActions } from "../../reducers/dictionary";
import IconButton from "../../components/forms/iconButton/IconButton";
import LazyList from "../../components/lazyList/LazyList";
import { Link } from "react-router-dom";
import TextInput from "../../components/forms/textInput/TextInput";
import WordsSelectors from "../../selectors/words";
import { pluralize } from "../../utils/string";

const Dictionary = () => {
	const dispatch = useDispatch();

	const [localSearch, setLocalSearch] = useState("");

	const matchedWords = useSelector((state) => WordsSelectors.bySearch(state));

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
				<IconButton icon="close" label={"Réinitialiser"} onClick={resetSearch} />
				<TextInput
					value={localSearch}
					onChange={(x) => {
						setLocalSearch(x);
					}}
				/>
				<Button type="submit" label="Rechercher" />
			</form>
			<div className="result">
				<LazyList
					items={matchedWords}
					headerComponent={() => (
						<div className="count">
							{wordsCount} {pluralize("mot", wordsCount)}{" "}
							{pluralize("trouvé", wordsCount)}
						</div>
					)}
					itemRenderer={({ item }) => (
						<Link to={`/mot/${item.toLowerCase()}`}>{item}</Link>
					)}
				/>
			</div>
		</div>
	);
};

export default Dictionary;
