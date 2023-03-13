import "./backLink.scss";

import { useNavigate } from "react-router-dom";

const BackLink = () => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className="link back-link"
			onClick={() => {
				navigate(-1);
			}}
		>
			Retour
		</button>
	);
};

export default BackLink;
