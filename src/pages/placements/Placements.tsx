import "./placements.scss";

import { useDispatch, useSelector } from "../../store";
import { useEffect, useState } from "react";

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

	useEffect(() => {
		setLocalConfiguration(configuration);
	}, [configuration]);

	useEffect(() => {
		setLocalLetters(letters);
	}, [letters]);

	const setSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (localConfiguration && localLetters) {
			dispatch(
				PlacementsActions.set({
					configuration: localConfiguration,
					letters: localLetters,
				})
			);
		}
	};

	return (
		<div id="placements">
			<div className="search">
				<form className="main" onSubmit={setSearch}>
					<PlacementsInput
						value={localConfiguration}
						onChange={(x) => {
							setLocalConfiguration(x);
						}}
					/>
					<LettersInput
						label="Lettres à placer"
						maxLettersCount={7}
						maxWildcardsCount={4}
						value={localLetters}
						onChange={(x) => {
							setLocalLetters(x);
						}}
					/>
					<Button type="submit" label="Rechercher" />
				</form>
			</div>
			<div className="result">
				<WordsList words={matchedWords} />
			</div>
		</div>
	);
};

export default Placements;
