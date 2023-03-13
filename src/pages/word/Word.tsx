import "./word.scss";

import { Link, Navigate, useParams } from "react-router-dom";

import BackLink from "../../components/backLink/BackLink";
import WordSelectors from "../../selectors/word";
import { useSelector } from "../../store";

const Word = () => {
	const { word } = useParams();

	const wordData = useSelector((state) => WordSelectors.wordData(state, word));

	if (!wordData) {
		return <Navigate to={`/error?error-nonexistent-word=${word ?? ""}`} replace />;
	}

	return (
		<div id="word">
			<h1>{wordData.word}</h1>
			<div className="neighbors">
				<div className="prefixes">
					<h2>1-préfixes</h2>
					{wordData.prefixes1.length >= 1 ? (
						<ul>
							{wordData.prefixes1.map((prefix) => (
								<li key={`${prefix}${wordData.word}`}>
									<Link
										className="raw"
										to={`/mot/${`${prefix}${wordData.word}`.toLowerCase()}`}
									>
										<em>{prefix}</em>
										{wordData.word}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="none">Aucun</p>
					)}
				</div>
				<div className="suffixes">
					<h2>1-suffixes</h2>
					{wordData.suffixes1.length >= 1 ? (
						<ul>
							{wordData.suffixes1.map((suffix) => (
								<li key={`${wordData.word}${suffix}`}>
									<Link
										className="raw"
										to={`/mot/${`${wordData.word}${suffix}`.toLowerCase()}`}
									>
										{wordData.word}
										<em>{suffix}</em>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="none">Aucun</p>
					)}
				</div>
			</div>
			<BackLink />
		</div>
	);
};

export default Word;
