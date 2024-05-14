import "./searchHelpers.scss";

import { type SearchHelperId, SearchHelpers as SearchHelpersList } from "../../../utils/dictionary";
import { useMemo, useRef, useState } from "react";
import Button from "../../../components/forms/button/Button";
import { DictionaryActions } from "../../../reducers/dictionary";
import LettersInput from "../../../components/forms/lettersInput/LettersInput";
import Modal from "../../../components/modal/Modal";
import Regex from "../../../utils/regex";
import TextInput from "../../../components/forms/textInput/TextInput";
import { useDispatch } from "../../../store";

const SearchHelpers = () => {
	const dispatch = useDispatch();

	const [currentHelperId, setCurrentHelperId] = useState<SearchHelperId | null>(null);
	const [input, setInput] = useState("");

	const textInputRef = useRef<HTMLInputElement>(null);

	const currentHelper = useMemo(() => {
		return currentHelperId ? SearchHelpersList[currentHelperId] : null;
	}, [currentHelperId]);

	const onSelectHelper = (searchHelperId: SearchHelperId) => {
		setCurrentHelperId(searchHelperId);
	};

	const onCloseHelper = () => {
		setCurrentHelperId(null);
		setInput("");
	};

	const onLoadHelper = () => {
		textInputRef.current?.focus();
	};

	const onValidate = () => {
		if (input) {
			const search = Regex[currentHelperId as SearchHelperId](input);
			dispatch(
				DictionaryActions.set({
					search,
					...(currentHelper?.autoSort ? { sorting: currentHelper.autoSort } : {}),
				})
			);

			setCurrentHelperId(null);
			setInput("");
		}
	};

	return (
		<div id="search-helpers">
			{Object.entries(SearchHelpersList).map(([searchHelperId, searchHelper]) => (
				<Button
					key={searchHelperId}
					label={searchHelper.label}
					title={searchHelper.title}
					selected={currentHelperId === searchHelperId}
					onClick={() => {
						onSelectHelper(searchHelperId as SearchHelperId);
					}}
				/>
			))}
			<Modal
				visible={Boolean(currentHelperId)}
				title={currentHelper?.title}
				onLoad={onLoadHelper}
				onClose={onCloseHelper}
				onValidate={onValidate}
			>
				{currentHelper?.inputType === "letters-input" ? (
					<LettersInput
						ref={textInputRef}
						maxWildcardsCount={currentHelper.maxWildcardsCount}
						value={input}
						onChange={(x) => {
							setInput(x);
						}}
					/>
				) : (
					<TextInput
						ref={textInputRef}
						type="word"
						value={input}
						onChange={(x) => {
							setInput(x);
						}}
					/>
				)}
			</Modal>
		</div>
	);
};

export default SearchHelpers;
