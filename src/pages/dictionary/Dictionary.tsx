import "./dictionary.scss";

import { useDispatch, useSelector } from "../../store";

import Button from "../../components/forms/button/Button";
import { DictionaryActions } from "../../reducers/dictionary";
import LazyList from "../../components/lazyList/LazyList";
import TextInput from "../../components/forms/textInput/TextInput";
import WordsSelectors from "../../selectors/words";
import { useState } from "react";

const Dictionary = () => {
	const dispatch = useDispatch();

	const [localSearch, setLocalSearch] = useState("");

	const matchedWords = useSelector((state) => WordsSelectors.bySearch(state));

	const setSearch = () => {
		dispatch(DictionaryActions.setSearch(localSearch));
	};

	return (
		<div id="dictionary">
			<div className="search">
				<TextInput
					value={localSearch}
					onChange={(x) => {
						setLocalSearch(x);
					}}
				/>
				<Button label="Rechercher" onClick={setSearch} />
			</div>
			<div className="result">
				<LazyList items={matchedWords} />
			</div>
		</div>
	);
};

export default Dictionary;
