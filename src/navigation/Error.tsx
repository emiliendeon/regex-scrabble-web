import "./error.scss";

import { Link, useSearchParams } from "react-router-dom";

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
			<Link className="back" to="/">
				Revenir à l&apos;accueil
			</Link>
		</div>
	);
};

export default Error;
