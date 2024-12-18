import "./wordsList.scss";

import LazyList from "../lazyList/LazyList";
import WordItem from "../wordItem/WordItem";
import { type WordItem as WordItemType } from "../../types/word";
import { pluralize } from "../../utils/string";
import { useHashWord } from "../../utils/navigation";
import { useMemo } from "react";

type WordsListProps = {
	words: WordItemType[];
	isLoading?: boolean;
};

const WordsList = ({ words, isLoading }: WordsListProps) => {
	const hashWord = useHashWord();

	const items = useMemo(() => {
		return isLoading ? [] : words;
	}, [words, isLoading]);

	const wordsCount = useMemo(() => {
		return words.length;
	}, [words]);

	const currentIndex = useMemo(() => {
		if (!hashWord) {
			return undefined;
		}
		return words.findIndex((word) => word.word === hashWord.toUpperCase());
	}, [words, hashWord]);

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
