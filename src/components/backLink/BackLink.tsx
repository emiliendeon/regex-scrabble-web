import "./backLink.scss";

import { useNavigate } from "react-router-dom";

type BackLinkProps = {
	label?: string;
};

const BackLink = ({ label }: BackLinkProps) => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className="link back-link"
			onClick={() => {
				navigate(-1);
			}}
		>
			{label ?? "Retour"}
		</button>
	);
};

export default BackLink;
