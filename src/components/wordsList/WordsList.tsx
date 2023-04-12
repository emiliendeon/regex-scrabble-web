import "./wordsList.scss";

import LazyList from "../lazyList/LazyList";
import WordItem from "../wordItem/WordItem";
import { type WordItem as WordItemType } from "../../types/word";
import { pluralize } from "../../utils/string";
import { useMemo } from "react";

type WordsListProps = {
	words: WordItemType[];
};

const WordsList = ({ words }: WordsListProps) => {
	const wordsCount = useMemo(() => {
		return words.length;
	}, [words]);

	return (
		<LazyList<WordItemType>
			className="words-list"
			items={words}
			headerComponent={() => (
				<div className="count">
					{wordsCount} {pluralize("mot", wordsCount)} {pluralize("trouvé", wordsCount)}
				</div>
			)}
			itemRenderer={({ item }) => <WordItem wordItem={item} />}
		/>
	);
};

export default WordsList;
