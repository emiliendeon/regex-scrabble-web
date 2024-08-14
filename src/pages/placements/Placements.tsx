import "./placements.scss";

import { JOKERS_COUNT_SUPER, RACK_SIZE } from "../../utils/game";
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

	const resetSearch = () => {
		dispatch(PlacementsActions.reset());
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
				<div className="inputs">
					<PlacementsInput
						value={localConfiguration}
						onChange={setLocalConfiguration}
						onReset={resetSearch}
					/>
					<LettersInput
						label="Lettres à placer"
						maxLettersCount={RACK_SIZE}
						maxWildcardsCount={JOKERS_COUNT_SUPER}
						value={localLetters}
						onChange={setLocalLetters}
						onReset={resetSearch}
					/>
				</div>
				<Button type="submit" label="Rechercher" disabled={isSearchButtonDisabled} />
			</SearchForm>
		</div>
	);
};

export default Placements;
