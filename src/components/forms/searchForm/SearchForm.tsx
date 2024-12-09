import "./searchForm.scss";

import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "../iconButton/IconButton";
import { type WordItem } from "../../../types/word";
import WordsList from "../../wordsList/WordsList";
import clsx from "clsx";
import { useState } from "react";

export type SearchFormProps = React.PropsWithChildren<{
	toggleableMobile?: boolean;
	matchedWords: WordItem[];
	isLoading?: boolean;
	onSubmit: () => void;
	onDebounce?: () => void;
}>;

const SearchForm = ({
	children,
	toggleableMobile,
	matchedWords,
	isLoading,
	onSubmit,
	onDebounce,
}: SearchFormProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isVisibleMobile, setVisibleMobile] = useState(true);

	const onLocalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isLoading) {
			return;
		}

		onDebounce?.();
		navigate(location.pathname);
		onSubmit();
	};

	return (
		<div
			className={clsx("search-form", {
				"visible-mobile": !toggleableMobile || isVisibleMobile,
			})}
		>
			<div className="search">
				<form className="main" aria-disabled={isLoading} onSubmit={onLocalSubmit}>
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
				<WordsList words={matchedWords} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default SearchForm;
