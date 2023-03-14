import "./word.scss";

import { Link, Navigate, useParams } from "react-router-dom";

import BackLink from "../../components/backLink/BackLink";
import InvalidIcon from "../../components/icon/icons/InvalidIcon";
import ValidIcon from "../../components/icon/icons/ValidIcon";
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
							{wordData.prefixes1.map((prefixWord) => (
								<li key={prefixWord.word}>
									<Link
										className="raw"
										to={`/mot/${prefixWord.word.toLowerCase()}`}
									>
										<em>{prefixWord.prefix}</em>
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
							{wordData.suffixes1.map((suffixWord) => (
								<li key={suffixWord.word}>
									<Link
										className="raw"
										to={`/mot/${suffixWord.word.toLowerCase()}`}
									>
										{wordData.word}
										<em>{suffixWord.suffix}</em>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="none">Aucun</p>
					)}
				</div>
				{wordData.word.length >= 3 && (
					<>
						<div className="prefix-of">
							<h2>Préfixe de ?</h2>
							<div className="item">
								<Link
									className="raw"
									to={`/mot/${wordData.prefixOf.word.toLowerCase()}`}
								>
									{wordData.prefixOf.word}
								</Link>
								{wordData.prefixOf.valid ? (
									<ValidIcon label="Oui" />
								) : (
									<InvalidIcon label="Non" />
								)}
							</div>
						</div>
						<div className="suffix-of">
							<h2>Suffixe de ?</h2>
							<div className="item">
								<Link
									className="raw"
									to={`/mot/${wordData.suffixOf.word.toLowerCase()}`}
								>
									{wordData.suffixOf.word}
								</Link>
								{wordData.suffixOf.valid ? (
									<ValidIcon label="Oui" />
								) : (
									<InvalidIcon label="Non" />
								)}
							</div>
						</div>
					</>
				)}
			</div>
			<div className="links">
				<BackLink label="Précédent" />
				<Link to="/">Retour au dictionnaire</Link>
			</div>
		</div>
	);
};

export default Word;
