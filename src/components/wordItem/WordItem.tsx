import "./wordItem.scss";

import { Link, useLocation } from "react-router-dom";
import CaretIcon from "../icon/icons/CaretIcon";
import { type WordItem as WordItemType } from "../../types/word";
import WordValues from "../wordValues/WordValues";
import { useMemo } from "react";

type WordItemProps = {
	wordItem: WordItemType;
};

const WordItem = ({ wordItem }: WordItemProps) => {
	const location = useLocation();

	const wordSlug = useMemo(() => {
		return wordItem.word.toLowerCase();
	}, [wordItem.word]);

	return (
		<Link
			id={`mot-${wordSlug}`}
			className="word-item raw"
			to={`/mot/${wordSlug}?referer=${location.pathname}`}
		>
			<div className="length" title={`Mot de ${wordItem.length} lettres`}>
				{wordItem.length}
			</div>
			<div className="word">{wordItem.word}</div>
			<WordValues wordValues={wordItem} hasHoverActions />
			<CaretIcon showTitle orientation={"right"} />
		</Link>
	);
};

export default WordItem;
