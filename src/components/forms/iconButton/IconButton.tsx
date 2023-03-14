import "./iconButton.scss";

import { type ButtonProps } from "../button/Button";
import Icon from "../../icon/Icon";
import { type IconName } from "../../../types/icon";

type IconButtonProps = ButtonProps & {
	icon: IconName;
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
			<Icon name={icon} label={label} />
		</button>
	);
};

export default IconButton;
