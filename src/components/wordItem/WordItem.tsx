import "./wordItem.scss";

import CaretIcon from "../icon/icons/CaretIcon";
import { Link } from "react-router-dom";
import { type WordItem as WordItemType } from "../../types/word";
import WordValues from "../wordValues/WordValues";

type WordItemProps = {
	wordItem: WordItemType;
};

const WordItem = ({ wordItem }: WordItemProps) => {
	return (
		<Link className="word-item raw" to={`/mot/${wordItem.word.toLowerCase()}`}>
			<div className="length" title={`Mot de ${wordItem.length} lettres`}>
				{wordItem.length}
			</div>
			<div className="word">{wordItem.word}</div>
			<WordValues wordValues={wordItem} hasHoverActions />
			<CaretIcon orientation={"right"} />
		</Link>
	);
};

export default WordItem;
