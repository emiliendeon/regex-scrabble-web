import "./wordsList.scss";

import LazyList from "../lazyList/LazyList";
import WordItem from "../wordItem/WordItem";
import { type WordItem as WordItemType } from "../../types/word";
import { pluralize } from "../../utils/string";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

type WordsListProps = {
	words: WordItemType[];
	isLoading?: boolean;
};

const WordsList = ({ words, isLoading }: WordsListProps) => {
	const { hash } = useLocation();

	const items = useMemo(() => {
		return isLoading ? [] : words;
	}, [words, isLoading]);

	const wordsCount = useMemo(() => {
		return words.length;
	}, [words]);

	const currentIndex = useMemo(() => {
		if (!hash) {
			return undefined;
		}
		const [, hashWord] = hash.split("-");
		if (!hashWord) {
			return undefined;
		}
		return words.findIndex((word) => word.word === hashWord.toUpperCase());
	}, [words, hash]);

	return (
		<LazyList<WordItemType>
			className="words-list"
			items={items}
			headerComponent={() => (
				<div className="count">
					{isLoading ? (
						<>Recherche en cours...</>
					) : (
						<>
							{wordsCount} {pluralize("mot", wordsCount)}{" "}
							{pluralize("trouvé", wordsCount)}
						</>
					)}
				</div>
			)}
			itemRenderer={({ item }) => <WordItem wordItem={item} />}
			currentIndex={currentIndex}
		/>
	);
};

export default WordsList;
