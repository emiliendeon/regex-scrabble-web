import "./iconButton.scss";

import { type ButtonProps } from "../button/Button";

type IconButtonProps = ButtonProps & {
	icon: "close";
};

const IconButton = ({ type, icon, label, onClick }: IconButtonProps) => {
	return (
		<button
			type={type ?? "button"}
			className="icon-button"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		>
			<img src={`/assets/icons/${icon}.png`} alt={label} title={label} />
		</button>
	);
};

export default IconButton;
