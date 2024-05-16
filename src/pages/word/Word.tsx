import "./word.scss";

import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../store";

import BackLink from "../../components/backLink/BackLink";
import { DictionaryActions } from "../../reducers/dictionary";
import { Helmet } from "react-helmet-async";
import IconButton from "../../components/forms/iconButton/IconButton";
import InvalidIcon from "../../components/icon/icons/InvalidIcon";
import { MIN_WORD_LENGTH } from "../../utils/word";
import ValidIcon from "../../components/icon/icons/ValidIcon";
import WordSelectors from "../../selectors/word";
import WordValues from "../../components/wordValues/WordValues";
import { useMemo } from "react";

const Word = () => {
	const { word } = useParams();
	const [searchParams] = useSearchParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const wordData = useSelector((state) => WordSelectors.wordData(state, word));

	if (!wordData) {
		return <Navigate to={`/error?error-nonexistent-word=${word ?? ""}`} replace />;
	}

	const backLink = useMemo(() => {
		const referer = searchParams.get("referer");

		if (!referer || /^\/mot\//.test(referer)) {
			return undefined;
		}
		return `${referer}#mot-${wordData.word.toLowerCase()}`;
	}, [searchParams]);

	const goToDictionary = (search: string) => {
		dispatch(DictionaryActions.setSearch(search));
		navigate("/");
	};

	return (
		<div id="word">
			<Helmet>
				<meta property="og:title" content={wordData.title} />
				<title>{wordData.title}</title>
			</Helmet>
			<div className="links">
				<BackLink to={backLink} />
			</div>
			<h1>{wordData.word}</h1>
			<WordValues wordValues={wordData} size="large" />
			<div className="neighbors">
				<div className="prefixes">
					<h2>
						<div className="content">1-préfixes</div>
						<IconButton
							icon="arrow"
							orientation="right"
							onClick={() => {
								goToDictionary(wordData.prefixes1.search);
							}}
						/>
					</h2>
					{wordData.prefixes1.words.length >= 1 ? (
						<ul>
							{wordData.prefixes1.words.map((prefixWord) => (
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
					<h2>
						<div className="content">1-suffixes</div>
						<IconButton
							icon="arrow"
							orientation="right"
							onClick={() => {
								goToDictionary(wordData.suffixes1.search);
							}}
						/>
					</h2>
					{wordData.suffixes1.words.length >= 1 ? (
						<ul>
							{wordData.suffixes1.words.map((suffixWord) => (
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
				{wordData.word.length >= MIN_WORD_LENGTH + 1 && (
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
									<ValidIcon showTitle />
								) : (
									<InvalidIcon showTitle />
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
									<ValidIcon showTitle />
								) : (
									<InvalidIcon showTitle />
								)}
							</div>
						</div>
					</>
				)}
				<div className="anagrams">
					<h2>
						<div className="content">Anagrammes</div>
						<IconButton
							icon="arrow"
							orientation="right"
							onClick={() => {
								goToDictionary(wordData.anagrams.search);
							}}
						/>
					</h2>
					{wordData.anagrams.words.length >= 1 ? (
						<ul>
							{wordData.anagrams.words.map((anagramWord) => (
								<li key={anagramWord}>
									<Link className="raw" to={`/mot/${anagramWord.toLowerCase()}`}>
										{anagramWord}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="none">Aucune</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Word;
