import "./wordItem.scss";

import CaretIcon from "../icon/icons/CaretIcon";
import { Link } from "react-router-dom";
import { type WordItem as WordItemType } from "../../types/word";
import { pluralize } from "../../utils/string";

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
			<div
				className="score"
				title={`${wordItem.score} ${pluralize("point", wordItem.score)}`}
			>
				{wordItem.score}
			</div>
			{wordItem.jokersCount >= 1 && (
				<>
					<div
						className="score-unrestricted"
						title={`${wordItem.scoreUnrestricted} ${pluralize(
							"point",
							wordItem.scoreUnrestricted
						)} sans restriction de lettres`}
					>
						{wordItem.scoreUnrestricted}
					</div>
					<div
						className="jokers-count"
						title={`Nécessite ${wordItem.jokersCount} ${pluralize(
							"joker",
							wordItem.jokersCount
						)} en partie classique`}
					>
						({wordItem.jokersCount})
					</div>
				</>
			)}
			<CaretIcon orientation={"right"} />
		</Link>
	);
};

export default WordItem;
