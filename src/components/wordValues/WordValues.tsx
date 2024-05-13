import "./wordValues.scss";

import { type WordValues as WordValuesType } from "../../types/word";
import clsx from "clsx";
import { pluralize } from "../../utils/string";

type WordValuesProps = {
	wordValues: WordValuesType;
	size?: "small" | "large";
	hasHoverActions?: boolean;
};

const WordValues = ({ wordValues, size, hasHoverActions }: WordValuesProps) => {
	return (
		<div
			className={clsx("word-values", size ?? "small", {
				"has-hover-actions": hasHoverActions,
			})}
		>
			<div
				className="score"
				title={`${wordValues.score} ${pluralize("point", wordValues.score)}`}
			>
				{wordValues.score}
			</div>
			{wordValues.jokersCount >= 1 && (
				<>
					<div
						className="score-unrestricted"
						title={`${wordValues.scoreUnrestricted} ${pluralize(
							"point",
							wordValues.scoreUnrestricted
						)} sans restriction de lettres`}
					>
						{wordValues.scoreUnrestricted}
					</div>
					<div
						className="jokers-count"
						title={`Nécessite ${wordValues.jokersCount} ${pluralize(
							"joker",
							wordValues.jokersCount
						)} en partie classique`}
					>
						({wordValues.jokersCount})
					</div>
				</>
			)}
		</div>
	);
};

export default WordValues;
