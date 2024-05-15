import "./backLink.scss";

import IconButton from "../forms/iconButton/IconButton";
import clsx from "clsx";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type BackLinkProps = {
	to?: string;
	label?: string;
	showLabel?: boolean;
};

const BackLink = ({ to, label, showLabel }: BackLinkProps) => {
	const navigate = useNavigate();

	const labelComputed = useMemo(() => {
		return label ?? "Précédent";
	}, [label]);

	const onClick = () => {
		if (to) {
			navigate(to);
		} else {
			navigate(-1);
		}
	};

	return (
		<div className={clsx("back-link", { "label-visible": showLabel })}>
			{showLabel ? (
				<button type="button" className="link" onClick={onClick}>
					{labelComputed}
				</button>
			) : (
				<IconButton
					icon="arrow"
					orientation="left"
					label={labelComputed}
					onClick={onClick}
				/>
			)}
		</div>
	);
};

export default BackLink;
