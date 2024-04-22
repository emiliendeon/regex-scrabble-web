import "./placements.scss";

import { useDispatch, useSelector } from "../../store";
import { useEffect, useMemo, useState } from "react";

import Button from "../../components/forms/button/Button";
import LettersInput from "../../components/forms/lettersInput/LettersInput";
import { PlacementsActions } from "../../reducers/placements";
import PlacementsInput from "../../components/forms/placementsInput/PlacementsInput";
import WordsList from "../../components/wordsList/WordsList";
import WordsSelectors from "../../selectors/words";

const Placements = () => {
	const dispatch = useDispatch();

	const { configuration, letters } = useSelector((state) => state.placements);
	const matchedWords = useSelector((state) => WordsSelectors.byPlacements(state));

	const [localConfiguration, setLocalConfiguration] = useState(configuration);
	const [localLetters, setLocalLetters] = useState(letters);

	const [isSearchButtonDebounced, setSearchButtonDebounced] = useState(false);

	const isSearchButtonDisabled = useMemo(() => {
		return localConfiguration === "" || localLetters === "" || isSearchButtonDebounced;
	}, [isSearchButtonDebounced, localConfiguration, localLetters]);

	useEffect(() => {
		setLocalConfiguration(configuration);
	}, [configuration]);

	useEffect(() => {
		setLocalLetters(letters);
	}, [letters]);

	const setSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setSearchButtonDebounced(true);

		if (localConfiguration && localLetters) {
			dispatch(
				PlacementsActions.set({
					configuration: localConfiguration,
					letters: localLetters,
				})
			);
		}
	};

	const onChangeLocalConfiguration = (value: string) => {
		setLocalConfiguration(value);
		setSearchButtonDebounced(false);
	};

	const onChangeLocalLetters = (value: string) => {
		setLocalLetters(value);
		setSearchButtonDebounced(false);
	};

	return (
		<div id="placements">
			<div className="search">
				<form className="main" onSubmit={setSearch}>
					<PlacementsInput
						value={localConfiguration}
						onChange={onChangeLocalConfiguration}
					/>
					<LettersInput
						label="Lettres à placer"
						maxLettersCount={7}
						maxWildcardsCount={4}
						value={localLetters}
						onChange={onChangeLocalLetters}
					/>
					<Button type="submit" label="Rechercher" disabled={isSearchButtonDisabled} />
				</form>
			</div>
			<div className="result">
				<WordsList words={matchedWords} />
			</div>
		</div>
	);
};

export default Placements;
