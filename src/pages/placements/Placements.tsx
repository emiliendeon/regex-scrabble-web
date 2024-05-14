import "./placements.scss";

import { useDispatch, useSelector } from "../../store";
import { useMemo, useState } from "react";

import Button from "../../components/forms/button/Button";
import LettersInput from "../../components/forms/lettersInput/LettersInput";
import { PlacementsActions } from "../../reducers/placements";
import PlacementsInput from "../../components/forms/placementsInput/PlacementsInput";
import SearchForm from "../../components/forms/searchForm/SearchForm";
import WordsSelectors from "../../selectors/words";
import { useDebounce } from "../../utils/react";

const Placements = () => {
	const dispatch = useDispatch();

	const { configuration, letters } = useSelector((state) => state.placements);
	const matchedWords = useSelector((state) => WordsSelectors.byPlacements(state));

	const [localConfiguration, setLocalConfiguration] = useState(configuration);
	const [localLetters, setLocalLetters] = useState(letters);

	const [isSearchButtonDebounced, setSearchButtonDebounced] = useDebounce([
		localConfiguration,
		localLetters,
	]);

	const isSearchButtonDisabled = useMemo(() => {
		return localConfiguration === "" || localLetters === "" || isSearchButtonDebounced;
	}, [isSearchButtonDebounced, localConfiguration, localLetters]);

	const setSearch = () => {
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
			<SearchForm
				toggleableMobile
				matchedWords={matchedWords}
				onSubmit={setSearch}
				onDebounce={() => {
					setSearchButtonDebounced(true);
				}}
			>
				<PlacementsInput value={localConfiguration} onChange={setLocalConfiguration} />
				<LettersInput
					label="Lettres à placer"
					maxLettersCount={7}
					maxWildcardsCount={4}
					value={localLetters}
					onChange={setLocalLetters}
				/>
				<Button type="submit" label="Rechercher" disabled={isSearchButtonDisabled} />
			</SearchForm>
		</div>
	);
};

export default Placements;
