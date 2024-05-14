import "./searchForm.scss";

import IconButton from "../iconButton/IconButton";
import { type WordItem } from "../../../types/word";
import WordsList from "../../wordsList/WordsList";
import clsx from "clsx";
import { useState } from "react";

export type SearchFormProps = React.PropsWithChildren<{
	toggleableMobile?: boolean;
	matchedWords: WordItem[];
	onSubmit: () => void;
	onDebounce?: () => void;
}>;

const SearchForm = ({
	children,
	toggleableMobile,
	matchedWords,
	onSubmit,
	onDebounce,
}: SearchFormProps) => {
	const [isVisibleMobile, setVisibleMobile] = useState(true);

	const onLocalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		onDebounce?.();
		onSubmit();
	};

	return (
		<div
			className={clsx("search-form", {
				"visible-mobile": !toggleableMobile || isVisibleMobile,
			})}
		>
			<div className="search">
				<form className="main" onSubmit={onLocalSubmit}>
					{children}
				</form>
				{toggleableMobile && (
					<IconButton
						icon="caret"
						label={
							isVisibleMobile
								? "Réduire le formulaire de recherche"
								: "Afficher le formulaire de recherche"
						}
						orientation={isVisibleMobile ? "up" : "down"}
						onClick={() => {
							setVisibleMobile((prev) => !prev);
						}}
					/>
				)}
			</div>
			<div className="result">
				<WordsList words={matchedWords} />
			</div>
		</div>
	);
};

export default SearchForm;
