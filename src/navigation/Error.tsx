import "./error.scss";

import { Link, useSearchParams } from "react-router-dom";

import BackLink from "../components/backLink/BackLink";
import { useMemo } from "react";

const Error = () => {
	const [searchParams] = useSearchParams();

	const errorNonexistentWord = useMemo(() => {
		return searchParams.get("error-nonexistent-word");
	}, [searchParams]);

	return (
		<div id="error">
			<h1>
				{errorNonexistentWord ? (
					<>
						Le mot <span className="word">{errorNonexistentWord}</span> n&apos;existe
						pas dans le dictionnaire.
					</>
				) : (
					"Page non trouvée"
				)}
			</h1>
			<div className="links">
				<BackLink label="Retour à la page précédente" showLabel />
				<Link to="/">Retour à l&apos;accueil</Link>
			</div>
		</div>
	);
};

export default Error;
