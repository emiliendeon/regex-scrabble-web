import "./searchHelpers.scss";

import { type SearchHelperId, SearchHelpers as SearchHelpersList } from "../../../utils/dictionary";
import Button from "../../../components/forms/button/Button";

type SearchHelpersProps = {
	currentHelperId: SearchHelperId | null;
	onChangeCurrentHelperId: (searchHelperId: SearchHelperId) => void;
	disabled?: boolean;
};

const SearchHelpers = ({
	currentHelperId,
	onChangeCurrentHelperId,
	disabled,
}: SearchHelpersProps) => {
	return (
		<div id="search-helpers">
			{Object.entries(SearchHelpersList).map(([searchHelperId, searchHelper]) => (
				<Button
					key={searchHelperId}
					label={searchHelper.label}
					title={searchHelper.title}
					selected={currentHelperId === searchHelperId}
					disabled={disabled}
					onClick={() => {
						onChangeCurrentHelperId(searchHelperId as SearchHelperId);
					}}
				/>
			))}
		</div>
	);
};

export default SearchHelpers;
